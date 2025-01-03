"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourse = void 0;
const mongoose_1 = require("mongoose");
const offeredCourse_conostant_1 = require("./offeredCourse.conostant");
const offeredCourseSchema = new mongoose_1.Schema({
    semesterRegistration: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'SemesterRegistration',
        required: true
    },
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true
    },
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    maxCapacity: {
        type: Number,
        required: true
    },
    section: {
        type: Number,
        required: true
    },
    days: [{
            type: String,
            enum: offeredCourse_conostant_1.Days
        }],
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
}, { timestamps: true });
exports.OfferedCourse = (0, mongoose_1.model)('OfferedCourse', offeredCourseSchema);
