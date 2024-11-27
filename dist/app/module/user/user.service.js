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
exports.UserService = void 0;
const config_1 = require("../../../config");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const createStudentDB = (password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    /// if password not provided in data base
    userData.password = password || config_1.envFile.default_password;
    ///set student role
    userData.role = 'student';
    userData.id = '203010001';
    ////create a user first
    const newUser = yield user_model_1.User.create(userData);
    ////create a student if user created
    if (Object.keys(newUser).length) {
        studentData.id = newUser.id;
        studentData.user = newUser._id;
        const newStudent = yield student_model_1.Student.create(studentData);
        return newStudent;
    }
});
exports.UserService = {
    createStudentDB,
};
