import { studentService } from './student.service';
import sendResponses from '../../utils/sendRespons';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';




const allStudents = catchAsync(async (req, res) => {
  const result = await studentService.getAllStudentDB();

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student Retrieve successfully',
    data: result,
  });
});




const getSingleStudent = catchAsync(async (req, res) => {
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
