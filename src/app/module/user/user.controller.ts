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


const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;
 
  console.log(facultyData);
  const result = await UserService.createFacultyDB(password, facultyData);

  sendResponses(res, {
    statusCode: statuscode.OK,
    success: true,
    message: 'Faculty create successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
 
  const result = await UserService.createAdminDB(password, adminData);

  sendResponses(res, {
    statusCode: statuscode.OK,
    success: true,
    message: 'Admin create successfully',
    data: result,
  });
});





export const UserController = {
  createStudent,
  createFaculty, 
  createAdmin
};
