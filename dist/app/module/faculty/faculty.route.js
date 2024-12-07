"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoute = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const validateRequest_1 = __importDefault(require("../../middelwares/validateRequest"));
const faculty_validation_1 = require("./faculty.validation");
const route = express_1.default.Router();
route.get('/', faculty_controller_1.FacultyController.getAllFaculties);
route.get('/:facultyId', faculty_controller_1.FacultyController.getSingleFaculties);
route.patch('/:facultyId', (0, validateRequest_1.default)(faculty_validation_1.facultyValidation.updateFacultyValidationSchema), faculty_controller_1.FacultyController.updateFaculties);
route.delete('/:facultyId', faculty_controller_1.FacultyController.deleteFaculties);
exports.FacultyRoute = route;
