import { z } from "zod";



const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic Department must a string", 
            required_error: "Name must be provided"
        }), 
        academicFaculty: z.string({
            invalid_type_error: "Academic Faculty must a string id", 
            required_error: "Name must be provided"
        })

    })
})

const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic Department must a string", 
            required_error: "Name must be provided"
        }).optional(), 
        academicFaculty: z.string({
            invalid_type_error: "Academic Faculty must a string id", 
            required_error: "Name must be provided"
        }).optional()

    })
})



export const AcademicDepartmentValidation = {
    createAcademicDepartmentValidationSchema, 
    updateAcademicDepartmentValidationSchema
}