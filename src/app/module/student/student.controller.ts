import { StudentService } from './student.service';
import sendResponses from '../../utils/sendRespons';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

const allStudents = catchAsync(async (req, res) => {
  console.log(req.query);
  const result = await StudentService.getAllStudentDB(req.query);

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student Retrieve successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.getSingleStudentDB(id);

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Get single Retrieve successfully',
    data: result,
  });
});

const deletedStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.deleteStudentDB(id);

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const {id} = req.params
  const payload = req.body
  console.log(payload );
  const result = await StudentService.updateStudentDB(id, payload);

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update Student successfully',
    data: result,
  });
});

export const StudentController = {
  allStudents,
  getSingleStudent,
  deletedStudent,
  updateStudent,
};
