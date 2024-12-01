"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemester = void 0;
const mongoose_1 = require("mongoose");
const academicSemester_constand_1 = require("./academicSemester.constand");
const academicSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: academicSemester_constand_1.AcademicSemesterName,
        required: true
    },
    code: {
        type: String,
        enum: academicSemester_constand_1.AcademicSemesterCode,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    startMonth: {
        type: String,
        required: true,
        enum: academicSemester_constand_1.months
    },
    endMonth: {
        type: String,
        required: true,
        enum: academicSemester_constand_1.months
    },
}, { timestamps: true });
exports.AcademicSemester = (0, mongoose_1.model)("AcademicSemester", academicSemesterSchema);
