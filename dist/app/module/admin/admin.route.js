"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const validateRequest_1 = __importDefault(require("../../middelwares/validateRequest"));
const admin_validation_1 = require("./admin.validation");
const route = express_1.default.Router();
route.get('/', admin_controller_1.AdminController.getAllAdmin);
route.get('/:adminId', admin_controller_1.AdminController.getSingleAdmin);
route.patch('/:adminId', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.updateAdminValidationSchema), admin_controller_1.AdminController.updateAdmin);
route.delete('/:adminId', admin_controller_1.AdminController.deleteAdmin);
exports.AdminRoute = route;
