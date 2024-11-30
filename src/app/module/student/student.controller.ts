import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentService } from './student.service';
import sendResponses from '../../utils/sendRespons';
import { StatusCodes } from 'http-status-codes';


const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};




const allStudents = catchAsync(async (req, res, next) => {
  const result = await studentService.getAllStudentDB();

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student Retrieve successfully',
    data: result,
  });
});




const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const result = await studentService.getSingleStudentDB(id);

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Get single Retrieve successfully',
    data: result,
  });
});





export const studentController = {
  allStudents,
  getSingleStudent,
};
