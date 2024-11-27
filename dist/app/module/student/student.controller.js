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
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = void 0;
const student_service_1 = require("./student.service");
const allStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.studentService.getAllStudentDB();
        res.status(200).json({
            success: true,
            message: 'Student Retrieve successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const result = yield student_service_1.studentService.getSingleStudentDB(id);
        res.status(200).json({
            success: true,
            message: 'Get single Retrieve successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.studentController = {
    allStudents,
    getSingleStudent,
};
