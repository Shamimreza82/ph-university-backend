import { Types } from "mongoose";
import { TUserName } from "../student/student.interface";

export type TGender = 'male' | 'female' | 'other';
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';



export type TAdmin = {
    id: string; 
    user: Types.ObjectId; 
    designation: string; 
    name: TUserName; 
    gender: TGender;
    dateOfBirth?: Date; 
    email: string; 
    contactNo: string; 
    emergencyContactNo: string; 
    presentAddress: string; 
    permanentAddress: string; 
    profileImage: string; 
    managementDepartment: Types.ObjectId; 
    isDeleted: boolean; 
}