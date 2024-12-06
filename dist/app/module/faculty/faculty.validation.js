"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const userNameSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    middleName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
const facultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.instanceof(mongoose_1.Types.ObjectId),
        user: zod_1.z.string({
            required_error: 'user is require',
            invalid_type_error: 'User Id is an ObjectID ',
        }),
        name: userNameSchema,
        designation: zod_1.z.string({
            required_error: 'user is require',
        }),
        gender: zod_1.z.enum(['male', 'female', 'other']),
        dateOfBirth: zod_1.z.union([zod_1.z.date(), zod_1.z.string().datetime()]).optional(),
        email: zod_1.z.string().email(),
        contactNo: zod_1.z.string().min(10).max(15),
        emergencyContactNo: zod_1.z.string().min(10).max(15),
        presentAddress: zod_1.z.string().min(1),
        permanentAddress: zod_1.z.string().min(1),
        profileImage: zod_1.z.string().url(),
        academicDepartment: zod_1.z.instanceof(mongoose_1.Types.ObjectId).optional(),
        isDeleted: zod_1.z.boolean(),
    }),
});
exports.facultyValidation = {
    facultyValidationSchema
};
