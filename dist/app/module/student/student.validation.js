"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidations = void 0;
const zod_1 = require("zod");
// User Name Schema
const userNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().nonempty('First name is required'),
    middleName: zod_1.z.string().nonempty('Middle name is required'),
    lastName: zod_1.z.string().nonempty('Last name is required'),
});
// Guardian Schema
const guardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().nonempty("Father's name is required"),
    fatherOccupation: zod_1.z.string().nonempty("Father's occupation is required"),
    fatherContactNo: zod_1.z
        .string()
        .nonempty("Father's contact number is required")
        .regex(/^\d{10,15}$/, 'Invalid contact number format'),
    motherName: zod_1.z.string().nonempty("Mother's name is required"),
    motherOccupation: zod_1.z.string().nonempty("Mother's occupation is required"),
    motherContactNo: zod_1.z
        .string()
        .nonempty("Mother's contact number is required")
        .regex(/^\d{10,15}$/, 'Invalid contact number format'),
});
// Local Guardian Schema
const localGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Local guardian's name is required"),
    occupation: zod_1.z.string().nonempty("Local guardian's occupation is required"),
    contactNo: zod_1.z
        .string()
        .nonempty("Local guardian's contact number is required")
        .regex(/^\d{10,15}$/, 'Invalid contact number format'),
    address: zod_1.z.string().nonempty('Address is required'),
});
// Student Schema
const createStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20),
        student: zod_1.z.object({
            name: userNameValidationSchema,
            gender: zod_1.z.enum(['male', 'female', 'other'], {
                errorMap: () => ({
                    message: "Gender must be 'male', 'female', or 'other'",
                }),
            }),
            dateOfBirth: zod_1.z
                .date()
                .optional(),
            email: zod_1.z.string().email('Invalid email format'),
            contactNo: zod_1.z
                .string()
                .nonempty('Contact number is required')
                .regex(/^\d{10,15}$/, 'Invalid contact number format'),
            emergencyContactNo: zod_1.z
                .string()
                .nonempty('Emergency contact number is required')
                .regex(/^\d{10,15}$/, 'Invalid contact number format'),
            bloodGroup: zod_1.z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
                .optional(),
            presentAddress: zod_1.z.string().nonempty('Present address is required'),
            permanentAddress: zod_1.z.string().nonempty('Permanent address is required'),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema,
            profileImg: zod_1.z.string().url('Invalid URL').optional(),
        }),
    }),
});
exports.studentValidations = {
    createStudentValidationSchema,
};
