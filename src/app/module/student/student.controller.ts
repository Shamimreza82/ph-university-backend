import { Request, Response } from 'express';
import { studentService } from './student.service';

const allStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getAllStudentDB();

    res.status(200).json({
      success: true,
      message: 'Student Retrieve successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Student Retrieve Unsuccessfully',
      error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      message: 'Get single Retrieve  Unsuccessfully',
      error,
    });
  }
};

export const studentController = {
  allStudents,
  getSingleStudent,
};
