"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = void 0;
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: { types: String, required: true },
    middleName: { types: String, required: true },
    lastName: { types: String, required: true },
});
const facultySchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    name: { type: userNameSchema, required: true },
    designation: { types: String, required: true },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    dateOfBirth: { type: Date },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImage: { type: String, required: true },
    academicDepartment: { type: mongoose_1.Schema.Types.ObjectId },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });
exports.Faculty = (0, mongoose_1.model)("Faculty", facultySchema);
