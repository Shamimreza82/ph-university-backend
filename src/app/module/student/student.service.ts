import { Student } from "./student.model";


const getAllStudentDB = async () => {
    const result = await Student.find()
    return result
}
const getSingleStudentDB = async (id: string) => {
    const result = await Student.findById(id)
    return result
}


export const studentService = {
    getAllStudentDB,
    getSingleStudentDB
}