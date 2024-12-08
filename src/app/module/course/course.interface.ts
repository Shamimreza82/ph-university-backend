import { Types } from "mongoose";

export type TPrePerquisiteCourses = {
    course: Types.ObjectId
    isDeleted: boolean
}



export type TCourse = {
    title: string, 
    prefix: string; 
    code: number; 
    credits: number;
    isDeleted?: boolean; 
    prePerquisiteCourses: [TPrePerquisiteCourses]
}

export type TCourseFaculty = {
    courseId: Types.ObjectId; 
    faculties: [Types.ObjectId]
}