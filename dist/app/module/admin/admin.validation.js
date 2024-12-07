"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const userNameSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    middleName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
const createAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string(),
        admin: zod_1.z.object({
            id: zod_1.z.string().optional(),
            name: userNameSchema,
            designation: zod_1.z.string({
                required_error: 'user is require',
            }),
            gender: zod_1.z.enum(['male', 'female', 'other']),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email(),
            contactNo: zod_1.z.string().min(10).max(15),
            emergencyContactNo: zod_1.z.string().min(10).max(15),
            presentAddress: zod_1.z.string().min(1),
            permanentAddress: zod_1.z.string().min(1),
            profileImage: zod_1.z.string().url(),
            // academicDepartment: z.instanceof(Types.ObjectId).optional(),
            isDeleted: zod_1.z.boolean(),
        }),
    }),
});
const updateAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        admin: zod_1.z.object({
            // id: z.string().optional(),
            name: userNameSchema.optional(),
            designation: zod_1.z.string({
                required_error: 'user is require',
            }).optional(),
            gender: zod_1.z.enum(['male', 'female', 'other']).optional(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email().optional(),
            contactNo: zod_1.z.string().min(10).max(15).optional(),
            emergencyContactNo: zod_1.z.string().min(10).max(15).optional(),
            presentAddress: zod_1.z.string().min(1).optional(),
            permanentAddress: zod_1.z.string().min(1).optional(),
            profileImage: zod_1.z.string().url().optional(),
            // academicDepartment: z.instanceof(Types.ObjectId).optional(),
            isDeleted: zod_1.z.boolean(),
        }),
    }),
});
exports.AdminValidation = {
    createAdminValidationSchema,
    updateAdminValidationSchema
};
