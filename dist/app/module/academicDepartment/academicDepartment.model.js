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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartment = void 0;
const mongoose_1 = require("mongoose");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicDepartmentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        unique: true
    },
}, {
    timestamps: true,
});
academicDepartmentSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const isExistDepartment = yield exports.AcademicDepartment.findOne({
            name: this.name,
        });
        if (isExistDepartment) {
            throw new Error('Department is already exist');
        }
    });
});
academicDepartmentSchema.pre('findOneAndUpdate', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.getQuery();
        const isDepartmentExit = yield exports.AcademicDepartment.findOne(query._id);
        if (!isDepartmentExit) {
            throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "this department doesn't exist");
        }
    });
});
exports.AcademicDepartment = (0, mongoose_1.model)('AcademicDepartment', academicDepartmentSchema);
