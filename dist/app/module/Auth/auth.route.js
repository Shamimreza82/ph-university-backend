"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middelwares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../middelwares/auth"));
const user_conostant_1 = require("../user/user.conostant");
const auth_controller_1 = require("./auth.controller");
const route = express_1.default.Router();
route.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthController.loginUser);
route.post('/change-password', (0, auth_1.default)(user_conostant_1.USER_ROLE.faculty, user_conostant_1.USER_ROLE.admin, user_conostant_1.USER_ROLE.student), (0, validateRequest_1.default)(auth_validation_1.AuthValidation.changePasswordValidationSchema), auth_controller_1.AuthController.changePassword);
route.post('/forget-password', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.forgetPasswordValidationSchema), auth_controller_1.AuthController.forgetPassword);
//TODO need word refresh toke hare 
exports.AuthRouter = route;
