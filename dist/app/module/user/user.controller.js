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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const sendRespons_1 = __importDefault(require("../../utils/sendRespons"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, student: studentData } = req.body;
    const result = yield user_service_1.UserService.createStudentDB(password, studentData);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Student create successfully',
        data: result,
    });
}));
const createFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, faculty: facultyData } = req.body;
    console.log(facultyData);
    const result = yield user_service_1.UserService.createFacultyDB(password, facultyData);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Faculty create successfully',
        data: result,
    });
}));
const createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, admin: adminData } = req.body;
    const result = yield user_service_1.UserService.createAdminDB(password, adminData);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Admin create successfully',
        data: result,
    });
}));
exports.UserController = {
    createStudent,
    createFaculty,
    createAdmin
};
