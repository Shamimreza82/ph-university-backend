"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminId = exports.generateFacultyId = void 0;
const user_model_1 = require("./user.model");
const findLastStudentId = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne({
        role: role,
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    //203001   0001
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent.id : undefined;
});
const generateStudentId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastStudentId = yield findLastStudentId('student'); // student id 2030010001
    const lastStudentSemesterCode = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(4, 6); // 01
    const lastStudentYear = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(0, 4); // 2030
    const currentSemesterCode = payload.code;
    const currentYear = payload.year;
    if (lastStudentId &&
        lastStudentSemesterCode === currentSemesterCode &&
        lastStudentYear === currentYear) {
        currentId = lastStudentId.substring(6); /// 0001
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
});
exports.default = generateStudentId;
///////////
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const findFacultyLastId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne({
        role: 'faculty',
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    }).lean();
    //203001   0001
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id : undefined;
});
const generateFacultyId = (Prefix) => __awaiter(void 0, void 0, void 0, function* () {
    let id = yield findFacultyLastId();
    if (id === undefined) {
        id = "F-0000";
    }
    const formateId = Number(id.split('-')[1]);
    const number = (Number(formateId) + 1).toString().padStart(4, '0') || '0001';
    const newNumber = number || '0001';
    const newId = `${Prefix}-${newNumber}`;
    return newId;
});
exports.generateFacultyId = generateFacultyId;
//////////////
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const findAdminLastId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne({
        role: 'admin',
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    }).lean();
    //203001   0001
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id : undefined;
});
const generateAdminId = (Prefix) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield findAdminLastId();
    console.log(id);
    const formateId = Number(id.split('-')[1]);
    const number = (Number(formateId) + 1).toString().padStart(4, '0') || '0001';
    const newNumber = number || '0001';
    const newId = `${Prefix}-${newNumber}`;
    return newId;
});
exports.generateAdminId = generateAdminId;
