import { envFile } from "../../../config"
import { TStudent } from "../student/student.interface"
import { Student } from "../student/student.model"
import { TUser } from "./user.interface"
import { User } from "./user.model"

const createStudentDB = async (password: string, studentData: TStudent) => {

    const userData : Partial<TUser> = {} ;
    /// if password not provided in data base

    userData.password = password || envFile.default_password as string

    ///set student role

    userData.role = 'student'
    userData.id = '203010001'

    ////create a user first 
    const newUser = await User.create(userData)

    ////create a student if user created 
    if(Object.keys(newUser).length){
        studentData.id = newUser.id; 
        studentData.user = newUser._id

        const newStudent = await Student.create(studentData)
        return newStudent
    }
   
}

export const UserService = {
    createStudentDB,
}
