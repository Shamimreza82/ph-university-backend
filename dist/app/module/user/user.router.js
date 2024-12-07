"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const student_validation_1 = require("../student/student.validation");
const validateRequest_1 = __importDefault(require("../../middelwares/validateRequest"));
const faculty_validation_1 = require("../faculty/faculty.validation");
const admin_validation_1 = require("../admin/admin.validation");
const router = express_1.default.Router();
router.post('/create-student', (0, validateRequest_1.default)(student_validation_1.studentValidations.createStudentValidationSchema), user_controller_1.UserController.createStudent);
router.post('/create-faculty', (0, validateRequest_1.default)(faculty_validation_1.facultyValidation.createFacultyValidationSchema), user_controller_1.UserController.createFaculty);
router.post('/create-admin', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.createAdminValidationSchema), user_controller_1.UserController.createAdmin);
exports.UserRouter = router;
