import { Types } from "mongoose";
import { TUserName } from "../student/student.interface";



export type TAdmin = {
    id: string; 
    user: Types.ObjectId; 
    designation: string; 
    name: TUserName; 
    gender: 'male' | 'female' | 'other';
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