import z from 'zod'
import { AcademicSemesterCode, AcademicSemesterName, months } from './academicSemester.constand'


const createAcademicSemesterValidationSchema = z.object({
body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]), 
    year: z.string(),
    code: z.enum([...AcademicSemesterCode as [string, ...string[]]]), 
    startMonth: z.enum([...months as [string, ...string[]]]), 
    endMonth: z.enum([...months as [string, ...string[]]]), 
})

})

const updateAcademicSemesterValidationSchema = z.object({
body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    code: z.enum([...AcademicSemesterCode as [string, ...string[]]]).optional(),
    startMonth: z.enum([...months as [string, ...string[]]]).optional(),
    endMonth: z.enum([...months as [string, ...string[]]]).optional(),
})

})



export const AcademicSemesterValidation = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema
}

// export type TAcademicSemester = {
//     name: 'Autumn' | 'Summer' | 'Fall';
//     code: '01' | '02' | '03';
//     year: Date;
//     startMonth: TMonths;
//     endMonth: TMonths;
//   };
  