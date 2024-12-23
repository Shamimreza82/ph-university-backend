"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'id is required ' }),
        password: zod_1.z.string({ required_error: 'password is required' })
    })
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({ required_error: "Old Password Is Required" }),
        newPassword: zod_1.z.string({ required_error: 'password is required' })
    })
});
const forgetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: "user is require" })
    })
});
// const refreshToken
exports.AuthValidation = {
    loginValidationSchema,
    changePasswordValidationSchema,
    forgetPasswordValidationSchema
};
