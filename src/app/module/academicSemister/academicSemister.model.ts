
import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./acadenicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, months } from "./academicSemester.constand";





 const academicSemesterSchema =  new Schema<TAcademicSemester> ({
    name: {
        type: String, 
        enum: AcademicSemesterName,
        required: true
    }, 
    code: {
        type: String, 
        enum: AcademicSemesterCode,
        required: true
    },
    year: {
        type: String, 
        required: true
    }, 
    startMonth: {
        type: String,
        required: true,
        enum: months
      }, 
      endMonth: {
        type: String,
        required: true,
        enum: months
      },
}, {timestamps: true})

academicSemesterSchema.pre('save', async function(next) {
   const isSemesterExist = await AcademicSemester.findOne({
    year: this.year,
    name: this.name 
   
   })

   if(isSemesterExist){
    throw new Error ("Semester is already exist")
   }
   next()
})


export const AcademicSemester = model<TAcademicSemester>("AcademicSemester", academicSemesterSchema)