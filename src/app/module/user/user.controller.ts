import { Request, Response } from "express";
import { UserService } from "./user.service";


const createUser = async ( req: Request, res: Response) => {
    try {
        const {password, student: studentData} = req.body;  
        // const studentData = studentValidationSchema.safeParse(newStudent)
        // if(!studentData.success){
        //     res.send(studentData.error)
        //     return;
        // }
        const result = await UserService.createStudentDB(password, studentData)

        res.status(200).json({
            success: true, 
            message: "Student create successfully", 
            data: result
        })

    } catch (error) {
        res.status(500).json({
            success: false, 
            message: "Student create Unsuccessfully", 
            error,
        })
    }
}
 
export const UserController = {
    createUser,
}
