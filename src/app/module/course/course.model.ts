import { model, Schema } from "mongoose"
import { TCourse, TCourseFaculty, TPrePerquisiteCourses } from "./course.interface"



const prePerquisiteCoursesSchema = new Schema<TPrePerquisiteCourses>({
        course: {type: Schema.Types.ObjectId, ref: "Course"}, 
        isDeleted: {type: Boolean, default: false}
})

const courseSchema = new Schema<TCourse>({
  title: {type: String, required: true, unique: true, trim: true}, 
  prefix: {type: String, required: true, trim: true}, 
  code: {type: Number, required: true, trim: true}, 
  credits: {type: Number, required: true, trim: true},
  prePerquisiteCourses: [prePerquisiteCoursesSchema], 
  isDeleted: {type: Boolean, default: false}
})

export const Course = model<TCourse>('Course', courseSchema)




const courseFacultySchema = new Schema<TCourseFaculty>({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course', 
    unique: true
  }, 
  faculties: [{
      type: Schema.Types.ObjectId,
      ref: 'Faculty', 
  }]
})

export const CourseFaculty = model<TCourseFaculty>("CourseFaculty", courseFacultySchema)