import { model, Schema } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

// User Name Schema
const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// Guardian Schema
const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

// Local Guardian Schema
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

// Student Schema
const studentSchema = new Schema<TStudent>(
  {
    id: {type: String},
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name: { type: userNameSchema, required: true },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    dateOfBirth: { type: Date },
    email: { type: String, required: true},
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    isDeleted: {type: Boolean, default: false },
    profileImg: { type: String },
    academicDepartment: {type: Schema.Types.ObjectId, ref: "AcademicDepartment", required: true},
    admissionSemester: {type: Schema.Types.ObjectId, ref: "AcademicSemester", required: true}
  },
  { timestamps: true },
);

studentSchema.pre('save', async function(next){
  const {email} = this

  const isExistStudent = await Student.findOne({email})

  if(isExistStudent){
    console.log("Student already exist");
    throw new Error("Student already exist")
    
  }
  next()
})


export const Student = model<TStudent>('Student', studentSchema);
