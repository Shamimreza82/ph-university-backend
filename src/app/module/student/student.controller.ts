import { StudentService, studentService } from './student.service';
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
  const result = await studentService.getSingleStudentDB(id);


  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Get single Retrieve successfully',
    data: result,
  });
});

const deletedStudent = catchAsync(async(req, res) => {
  const {id} = req.params
 const result =  await StudentService.deleteStudentDB(id)

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result
  })
})





export const StudentController = {
  allStudents,
  getSingleStudent,
  deletedStudent
};
