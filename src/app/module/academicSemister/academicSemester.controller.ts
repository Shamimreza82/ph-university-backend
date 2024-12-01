
import sendResponses from '../../utils/sendRespons';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemister.service';




const createAcademicSemester = catchAsync(async (req, res) => {

  const result = await AcademicSemesterServices.createAcademicSemesterDB(req.body);

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});




// const getSingleStudent = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   const result = await studentService.getSingleStudentDB(id);


//   sendResponses(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'Get single Retrieve successfully',
//     data: result,
//   });
// });





export const AcademicSemesterController = {
    createAcademicSemester
};
