"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseFaculty = exports.Course = void 0;
const mongoose_1 = require("mongoose");
const prePerquisiteCoursesSchema = new mongoose_1.Schema({
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: "Course" },
    isDeleted: { type: Boolean, default: false }
});
const courseSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true, trim: true },
    prefix: { type: String, required: true, trim: true },
    code: { type: Number, required: true, trim: true },
    credits: { type: Number, required: true, trim: true },
    prePerquisiteCourses: [prePerquisiteCoursesSchema],
    isDeleted: { type: Boolean, default: false }
});
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
const courseFacultySchema = new mongoose_1.Schema({
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        unique: true
    },
    faculties: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Faculty',
        }]
});
exports.CourseFaculty = (0, mongoose_1.model)("CourseFaculty", courseFacultySchema);
