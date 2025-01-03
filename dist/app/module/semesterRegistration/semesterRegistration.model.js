"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistration = void 0;
const mongoose_1 = require("mongoose");
const semesterRegistration_conostance_1 = require("./semesterRegistration.conostance");
const semesterRegistrationSchema = new mongoose_1.Schema({
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'AcademicSemester', ///// refer connect only mongoose  model 
        unique: true,
    },
    status: {
        type: String,
        enum: semesterRegistration_conostance_1.SemesterRegistrationStatus,
        required: true,
        default: "UPCOMING"
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    minCredit: { type: Number, required: true, default: 3 },
    maxCredit: { type: Number, required: true, default: 15 },
}, { timestamps: true });
exports.SemesterRegistration = (0, mongoose_1.model)('SemesterRegistration', semesterRegistrationSchema);
