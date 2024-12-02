"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const academicSemester_constand_1 = require("./academicSemester.constand");
const createAcademicSemesterValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.enum([...academicSemester_constand_1.AcademicSemesterName]),
        year: zod_1.default.string(),
        code: zod_1.default.enum([...academicSemester_constand_1.AcademicSemesterCode]),
        startMonth: zod_1.default.enum([...academicSemester_constand_1.months]),
        endMonth: zod_1.default.enum([...academicSemester_constand_1.months]),
    })
});
const updateAcademicSemesterValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.enum([...academicSemester_constand_1.AcademicSemesterName]).optional(),
        year: zod_1.default.string().optional(),
        code: zod_1.default.enum([...academicSemester_constand_1.AcademicSemesterCode]).optional(),
        startMonth: zod_1.default.enum([...academicSemester_constand_1.months]).optional(),
        endMonth: zod_1.default.enum([...academicSemester_constand_1.months]).optional(),
    })
});
exports.AcademicSemesterValidation = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema
};
// export type TAcademicSemester = {
//     name: 'Autumn' | 'Summer' | 'Fall';
//     code: '01' | '02' | '03';
//     year: Date;
//     startMonth: TMonths;
//     endMonth: TMonths;
//   };
