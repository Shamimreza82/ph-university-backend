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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("./student.model");
const user_model_1 = require("../user/user.model");
const getAllStudentDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let searchTerm = '';
    if (query === null || query === void 0 ? void 0 : query.searchTerm) {
        searchTerm = query === null || query === void 0 ? void 0 : query.searchTerm;
    }
    ///{email: {$regex: query.searchTerm, $options: i}}
    const result = yield student_model_1.Student.find({
        $or: ['email', "name.firstName", "presentAddress"].map(field => ({
            [field]: { $regex: searchTerm, $options: 'i' }
        }))
    })
        .populate('user')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    })
        .populate('admissionSemester');
    return result;
});
const getSingleStudentDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findById(id)
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    })
        .populate('admissionSemester');
    return result;
});
const deleteStudentDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        yield session.startTransaction();
        const deleteUser = yield user_model_1.User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deleteUser) {
            throw new Error('fail to deleted student');
        }
        const deleteStudent = yield student_model_1.Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session }).populate('user');
        if (!deleteStudent) {
            throw new Error('fail to deleted student');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deleteStudent;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const updateStudentDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, guardian, localGuardian } = payload, remaining = __rest(payload, ["name", "guardian", "localGuardian"]);
    console.log(name);
});
exports.StudentService = {
    getAllStudentDB,
    getSingleStudentDB,
    deleteStudentDB,
    updateStudentDB
};
