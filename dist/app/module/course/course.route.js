"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middelwares/validateRequest"));
const course_validation_1 = require("./course.validation");
const course_controller_1 = require("./course.controller");
const router = express_1.default.Router();
router.post('/create-course', (0, validateRequest_1.default)(course_validation_1.CourseValidationSchema.createCourseValidationSchema), course_controller_1.CourseControllers.createCourse);
router.get('/', course_controller_1.CourseControllers.getAllCourse);
router.get('/:id', course_controller_1.CourseControllers.getSingleCourse);
router.delete('/:id', course_controller_1.CourseControllers.deleteCourse);
router.patch('/:id', (0, validateRequest_1.default)(course_validation_1.CourseValidationSchema.updateCourseValidationSchema), course_controller_1.CourseControllers.updateCourse);
router.put('/:courseId/assign-faculties', (0, validateRequest_1.default)(course_validation_1.CourseValidationSchema.facultiesWithCourseValidationSchema), course_controller_1.CourseControllers.assignFacultiesWithCourse);
router.delete('/:courseId/remove-faculties', (0, validateRequest_1.default)(course_validation_1.CourseValidationSchema.facultiesWithCourseValidationSchema), course_controller_1.CourseControllers.removeFacultiesfromCourse);
exports.CourseRoutes = router;
