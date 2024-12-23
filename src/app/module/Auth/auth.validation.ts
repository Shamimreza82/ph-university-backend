import { z } from "zod";


const loginValidationSchema = z.object({
    body: z.object({
        id: z.string({required_error: 'id is required '}), 
        password: z.string({required_error: 'password is required'})
    })
})

const changePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string({required_error: "Old Password Is Required"}),
        newPassword: z.string({required_error: 'password is required'})
    })
})

const forgetPasswordValidationSchema = z.object({
    body: z.object({
        id: z.string({required_error: "user is require"})
    })
})


// const refreshToken

export const AuthValidation = {
    loginValidationSchema, 
    changePasswordValidationSchema, 
    forgetPasswordValidationSchema
}