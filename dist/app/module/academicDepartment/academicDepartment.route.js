"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middelwares/validateRequest"));
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const router = express_1.default.Router();
router.post('/create-academic-department', 
// validateRequest(
//   AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
// ),
academicDepartment_controller_1.AcademicDepartmentController.createAcademicDepartment);
router.get('/', academicDepartment_controller_1.AcademicDepartmentController.getAllAcademicDepartment);
router.get('/:departmentId', academicDepartment_controller_1.AcademicDepartmentController.getSingleAcademicDepartment);
router.patch('/:departmentId', (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema), academicDepartment_controller_1.AcademicDepartmentController.updateAcademicDepartment);
exports.AcademicDepartmentRouter = router;
