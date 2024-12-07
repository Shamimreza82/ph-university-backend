"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoute = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const route = express_1.default.Router();
route.get('/', faculty_controller_1.FacultyController.getAllFaculties);
route.get('/:facultyId', faculty_controller_1.FacultyController.getSingleFaculties);
exports.FacultyRoute = route;
