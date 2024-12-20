/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.conostant";

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};


export interface UserModel extends Model<TUser>{
    isUserExistByCustomId(id: string) : Promise<TUser>, 
    isPasswordMatch(plaintextPassword: string, hashPassword: string) : Promise<boolean>
}




export type TUserRole = keyof typeof USER_ROLE 