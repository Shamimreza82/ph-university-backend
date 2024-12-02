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
exports.AcademicSemesterServices = void 0;
const academicSemister_model_1 = require("./academicSemister.model");
const createAcademicSemesterDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesterNameCodeMapper = {
        Autumn: '01',
        Summer: '02',
        Fall: '03',
    };
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code');
    }
    const result = academicSemister_model_1.AcademicSemester.create(payload);
    return result;
});
const gteSingleAcademicSemesterDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemister_model_1.AcademicSemester.findOne({
        _id: id
    });
    return result;
});
const gteAllAcademicSemesterDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemister_model_1.AcademicSemester.find();
    return result;
});
const updateAcademicSemesterDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesterNameCodeMapper = {
        Autumn: '01',
        Summer: '02',
        Fall: '03',
    };
    if (payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code');
    }
    const result = academicSemister_model_1.AcademicSemester.findByIdAndUpdate({ _id: id }, { $set: payload }, { new: true });
    return result;
});
exports.AcademicSemesterServices = {
    createAcademicSemesterDB,
    gteSingleAcademicSemesterDB,
    gteAllAcademicSemesterDB,
    updateAcademicSemesterDB
};
