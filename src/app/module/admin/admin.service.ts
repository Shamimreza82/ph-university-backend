import mongoose from "mongoose";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import { User } from "../user/user.model";

const getAllAdminDB = async () => {
  const result = Admin.find();
  return result;
};

const getSingleAdminDB = async (id: string) => {
  const result = Admin.findOne({ id });
  return result;
};

const updateAdminDB = async (id: string, payload: TAdmin) => {
  const admin = payload.admin;
  const result = await Admin.findOneAndUpdate({ id }, admin, { new: true });
  return result;
};

const deleteAdminDB = async (id: string) => {
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

    const deleteAdmin = await Admin.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if(!deleteAdmin){
        throw new Error("failed to deleted Admin")
    }


    await session.commitTransaction()
    await session.endSession()

    return deleteAdmin;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
  }
};

export const AdminServices = {
    getAllAdminDB, 
    getSingleAdminDB, 
    updateAdminDB, 
    deleteAdminDB
};
