import { envFile } from '../../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};
  /// if password not provided in data base

  userData.password = password || (envFile.default_password as string);

  ///set student role
  const startYear: string = '2023'
  const semesterCode: string = '10'
  let counter: number = Math.random()
  

  userData.role = 'student';
  userData.id = `${startYear}${semesterCode} 00 ${counter++}`

  ////create a user first
  const existenceCheck = await Student.find({id: userData.id })

  if(existenceCheck){
    throw new Error ("User already exist in dataBase")
  }


  const newUser = await User.create(userData);

  ////create a student if user created
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  createStudentDB,
};
