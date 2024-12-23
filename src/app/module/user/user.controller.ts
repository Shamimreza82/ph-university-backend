import { UserService } from './user.service';
import sendResponses from '../../utils/sendRespons';
import statuscode from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { verifyToken } from '../Auth/auth.ults';
import { envFile } from '../../../config';






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


const getMe = catchAsync(async (req, res) => {
 const token = req.headers.authorization 

 if(!token){
  throw new Error("token not found")
 }



 
  const result = await UserService.getMe(token);

  sendResponses(res, {
    statusCode: statuscode.OK,
    success: true,
    message: 'data retrieve successfully',
    data: result,
  });
});





export const UserController = {
  createStudent,
  createFaculty, 
  createAdmin, 
  getMe, 
};
