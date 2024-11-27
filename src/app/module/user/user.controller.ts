import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import sendResponses from '../../utils/sendRespons';
import statuscode from 'http-status-codes';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, student: studentData } = req.body;
    // const studentData = studentValidationSchema.safeParse(newStudent)
    // if(!studentData.success){
    //     res.send(studentData.error)
    //     return;
    // }
    const result = await UserService.createStudentDB(password, studentData);

    // res.status(200).json({
    //   success: true,
    //   message: 'Student create successfully',
    //   data: result,
    // });

    sendResponses(res, {
      statusCode: statuscode.OK,
      success: true, 
      message: "Student create successfully", 
      data: result
    })

  } catch (error) {
    next(error)
  }
};

export const UserController = {
  createUser,
};
