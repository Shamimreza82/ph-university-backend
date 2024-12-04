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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../../../config");
const academicSemister_model_1 = require("../academicSemister/academicSemister.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = __importDefault(require("./user.utils"));
const createStudentDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const userData = {};
        // if password not provided in data base
        userData.password = password || config_1.envFile.default_password;
        //find academic semester info
        const admissionSemester = yield academicSemister_model_1.AcademicSemester.findById(payload.admissionSemester);
        userData.role = 'student';
        userData.id = yield (0, user_utils_1.default)(admissionSemester);
        console.log(userData);
        const newUser = yield user_model_1.User.create([userData], { session });
        //create a student if user created
        if (!newUser.length) {
            throw new Error('fail to create user');
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        const newStudent = yield student_model_1.Student.create([payload], { session });
        if (!newStudent) {
            throw new Error('fail to create Student');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (error) {
        console.log(error);
        yield session.abortTransaction();
        yield session.endSession();
    }
});
exports.UserService = {
    createStudentDB,
};
