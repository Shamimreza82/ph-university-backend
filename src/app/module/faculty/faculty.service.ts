import mongoose from 'mongoose';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import { User } from '../user/user.model';

const getAllFacultiesDB = async () => {
  const result = Faculty.find();
  return result;
};

const getSingleFacultiesDB = async (id: string) => {
  const result = Faculty.findOne({ id });
  return result;
};

const updateFacultiesDB = async (id: string, payload: TFaculty) => {
  const faculty = payload.faculty;

  const result = Faculty.findOneAndUpdate({ id }, faculty, { new: true });
  return result;
};

const deleteFacultiesDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session},
    );


    if(!deleteUser){
        throw new Error("failed to deleted user")
    }

    const deleteFaculty = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if(!deleteFaculty){
        throw new Error("failed to deleted Faculty")
    }


    await session.commitTransaction()
    await session.endSession()

    return deleteFaculty;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
  }
};

export const FacultiesServices = {
  getAllFacultiesDB,
  getSingleFacultiesDB,
  updateFacultiesDB,
  deleteFacultiesDB,
};
