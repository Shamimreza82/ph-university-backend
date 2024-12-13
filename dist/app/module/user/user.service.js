"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const faculty_model_1 = require("../faculty/faculty.model");
const user_utils_1 = __importStar(require("./user.utils"));
const admin_model_1 = require("../admin/admin.model");
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
///// create faculty///////////////////////////////
const createFacultyDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userFacultyObj = {};
    const session = yield mongoose_1.default.startSession();
    try {
        yield session.startTransaction();
        userFacultyObj.id = yield (0, user_utils_1.generateFacultyId)('F');
        userFacultyObj.role = 'faculty';
        userFacultyObj.password = config_1.envFile.default_password || password;
        const userFaculty = yield user_model_1.User.create([userFacultyObj], { session });
        if (userFaculty) {
            payload.id = userFaculty[0].id;
            payload.user = userFaculty[0]._id;
        }
        const newFaculty = yield faculty_model_1.Faculty.create(payload);
        yield session.commitTransaction();
        yield session.endSession();
        return newFaculty;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
///// create faculty/////////////////////////////////
const createAdminDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        yield session.startTransaction();
        const userAdminObj = {};
        userAdminObj.id = 'A-0001';
        userAdminObj.role = 'admin';
        userAdminObj.password = config_1.envFile.default_password || password;
        const userAdmin = yield user_model_1.User.create([userAdminObj], { session });
        if (userAdmin) {
            payload.id = userAdmin[0].id;
            payload.user = userAdmin[0]._id;
        }
        const newAdmin = yield admin_model_1.Admin.create([payload], { session });
        yield session.commitTransaction();
        yield session.endSession();
        return newAdmin[0];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
exports.UserService = {
    createStudentDB,
    createFacultyDB,
    createAdminDB,
};
