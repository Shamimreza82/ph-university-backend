import { envFile } from '../../../config';
import { AcademicSemester } from '../academicSemister/academicSemister.model';
import { TAcademicSemester } from '../academicSemister/acadenicSemester.interface';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import generateStudentId from './user.utils';

const createStudentDB = async (password: string, payload: TStudent) => {


  const userData: Partial<TUser> = {};

  // if password not provided in data base
  userData.password = password || (envFile.default_password as string);


  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  

  userData.role = 'student';
 
  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);  


  const newUser = await User.create(userData);

  //create a student if user created
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserService = {
  createStudentDB,
};
