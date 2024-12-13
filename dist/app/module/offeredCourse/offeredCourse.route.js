"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middelwares/validateRequest"));
const offeredCourse_validation_1 = require("./offeredCourse.validation");
const offeredCourse_controller_1 = require("./offeredCourse.controller");
const router = express_1.default.Router();
router.post('/create-offered-course', (0, validateRequest_1.default)(offeredCourse_validation_1.OfferedCourseValidation.offeredCourseValidationSchema), offeredCourse_controller_1.OfferedCourseController.createOfferedCourse);
router.get('/', offeredCourse_controller_1.OfferedCourseController.getAllOfferedCourse);
router.get('/:id', offeredCourse_controller_1.OfferedCourseController.getSingleOfferedCourse);
// router.patch(
//   '/:id',
//   validateRequest(
//     SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
//   ),
//   SemesterRegistrationController.updateSemesterRegistration,
// );
exports.OfferedCourseRouter = router;
