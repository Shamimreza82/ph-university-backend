import mongoose from 'mongoose';
import { Student } from './student.model';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentDB = async (query: Record<string, unknown>) => {


  let searchTerm = ''
  if(query?.searchTerm){
    searchTerm = query?.searchTerm as string
  }


///{email: {$regex: query.searchTerm, $options: i}}

  const result = await Student.find({
    $or: ['email', "name.firstName", "presentAddress"].map(field => ({
      [field] : {$regex: searchTerm, $options: 'i'}
    }))
  })
    .populate('user')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemester');
  return result;
};

const getSingleStudentDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemester');
  return result;
};

const deleteStudentDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new Error('fail to deleted student');
    }
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    ).populate('user');

    if (!deleteStudent) {
      throw new Error('fail to deleted student');
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteStudent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error)
  }
};

const updateStudentDB = async (id: string, payload: TStudent) => {

  const {name, guardian, localGuardian, ... remaining} = payload
  console.log(name);
}





export const StudentService = {
  getAllStudentDB,
  getSingleStudentDB,
  deleteStudentDB,
  updateStudentDB
};
