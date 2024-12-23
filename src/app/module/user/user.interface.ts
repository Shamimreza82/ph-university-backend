/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.conostant";

export interface TUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangeAt?:Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};


export interface UserModel extends Model<TUser>{
    isUserExistByCustomId(id: string) : Promise<TUser>, 
    isPasswordMatch(plaintextPassword: string, hashPassword: string) : Promise<boolean>
    isJWTIssuedBefourChangerd(passwordChangeTimeStamp: Date, jetIssuedTimeStamp: number): Promise<boolean>
}




export type TUserRole = keyof typeof USER_ROLE 