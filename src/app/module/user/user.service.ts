import mongoose from 'mongoose';
import { envFile } from '../../../config';
import { AcademicSemester } from '../academicSemister/academicSemister.model';
import { TAcademicSemester } from '../academicSemister/acadenicSemester.interface';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import generateStudentId, { generateAdminId, generateFacultyId } from './user.utils';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';



const createStudentDB = async (password: string, payload: TStudent) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const userData: Partial<TUser> = {};

    // if password not provided in data base
    userData.password = password || (envFile.default_password as string);

    //find academic semester info
    const admissionSemester = await AcademicSemester.findById(
      payload.admissionSemester,
    );

    userData.role = 'student';

    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    const newUser = await User.create([userData], {session});

    //create a student if user created
     if (!newUser.length) {
      throw new Error('fail to create user');
    }
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id;

      const newStudent = await Student.create([payload], {session});
      if (!newStudent) {
        throw new Error('fail to create Student');
      }

      await session.commitTransaction()
      await session.endSession()
      return newStudent;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()

    throw new Error(error)
  }
};



///// create faculty///////////////////////////////

const createFacultyDB = async (password: string, payload: TFaculty) => {


const userFacultyObj: Record<string, unknown> = {}

userFacultyObj.id = await generateFacultyId("F") 
userFacultyObj.role = 'faculty'
userFacultyObj.password = envFile.default_password || password

const userFaculty = await User.create(userFacultyObj)

if(userFaculty){
  payload.id = userFaculty.id
  payload.user = userFaculty._id
}

const newFaculty = await Faculty.create(payload)

return newFaculty
}




///// create faculty/////////////////////////////////

const createAdminDB = async (password: string, payload: TAdmin) => {


const userAdminObj: Record<string, unknown> = {}

userAdminObj.id = await generateAdminId('A')
userAdminObj.role = 'admin'
userAdminObj.password = envFile.default_password || password

const userAdmin = await User.create(userAdminObj)

if(userAdmin){
  payload.id = userAdmin.id
  payload.user = userAdmin._id
}

const newAdmin = await Admin.create(payload)

return newAdmin
}




export const UserService = {
  createStudentDB,
  createFacultyDB, 
  createAdminDB
};
