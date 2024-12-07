import { model, Schema } from 'mongoose';
import { TFaculty } from './faculty.interface';
import { TUserName } from '../student/student.interface';

const userNameSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const facultySchema = new Schema(
  {
    id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: userNameSchema, required: true },
    designation: { type: String, required: true },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    dateOfBirth: { type: Date },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImage: { type: String, required: true },
    academicDepartment: { type: Schema.Types.ObjectId, ref: 'Department' },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Faculty = model<TFaculty>('Faculty', facultySchema);
