"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistrationRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middelwares/validateRequest"));
const semesterRegistration_validation_1 = require("./semesterRegistration.validation");
const semesterRegistration_controller_1 = require("./semesterRegistration.controller");
const router = express_1.default.Router();
router.post('/create-semester-registration', (0, validateRequest_1.default)(semesterRegistration_validation_1.SemesterRegistrationValidation.createSemesterRegistrationValidationSchema), semesterRegistration_controller_1.SemesterRegistrationController.createSemesterRegistration);
router.get('/', semesterRegistration_controller_1.SemesterRegistrationController.getAllSemesterRegistration);
router.get('/:id', semesterRegistration_controller_1.SemesterRegistrationController.getSingleSemesterRegistration);
router.patch('/:id', (0, validateRequest_1.default)(semesterRegistration_validation_1.SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema), semesterRegistration_controller_1.SemesterRegistrationController.updateSemesterRegistration);
exports.SemesterRegistrationRouter = router;
