import { NextFunction, Request, Response } from 'express';
import { studentService } from './student.service';

const allStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentService.getAllStudentDB();

    res.status(200).json({
      success: true,
      message: 'Student Retrieve successfully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await studentService.getSingleStudentDB(id);

    res.status(200).json({
      success: true,
      message: 'Get single Retrieve successfully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

export const studentController = {
  allStudents,
  getSingleStudent,
};
