import { UserService } from './user.service';
import sendResponses from '../../utils/sendRespons';
import statuscode from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';






const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
 
  const result = await UserService.createStudentDB(password, studentData);

  sendResponses(res, {
    statusCode: statuscode.OK,
    success: true,
    message: 'Student create successfully',
    data: result,
  });
});





export const UserController = {
  createStudent,
};
