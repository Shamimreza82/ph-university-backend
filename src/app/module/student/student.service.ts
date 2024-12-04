import mongoose from 'mongoose';
import { Student } from './student.model';
import { User } from '../user/user.model';



const getAllStudentDB = async () => {
  const result = await Student.find().populate('user')
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

  const session = await mongoose.startSession()
  try {
    await session.startTransaction()
    const deleteUser = await User.findOneAndUpdate({id}, {isDeleted: true}, {new: true, session})
    if(!deleteUser){
      throw new Error("fail to deleted student")
    }
    const deleteStudent = await Student.findOneAndUpdate({id}, {isDeleted: true}, {new: true, session})

    if(!deleteStudent){
      throw new Error("fail to deleted student")
    }

    await session.commitTransaction()
    await session.endSession()

    return deleteStudent

  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    console.log(error);
  }

}



export const StudentService = {
  getAllStudentDB,
  getSingleStudentDB,
  deleteStudentDB
};
