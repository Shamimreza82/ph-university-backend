"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentValidation = void 0;
const zod_1 = require("zod");
const createAcademicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "Academic Department must a string",
            required_error: "Name must be provided"
        }),
        academicFaculty: zod_1.z.string({
            invalid_type_error: "Academic Faculty must a string id",
            required_error: "Name must be provided"
        })
    })
});
const updateAcademicDepartmentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "Academic Department must a string",
            required_error: "Name must be provided"
        }).optional(),
        academicFaculty: zod_1.z.string({
            invalid_type_error: "Academic Faculty must a string id",
            required_error: "Name must be provided"
        }).optional()
    })
});
exports.AcademicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
};
