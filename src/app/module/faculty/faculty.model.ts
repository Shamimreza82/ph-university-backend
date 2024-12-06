import { model, Schema } from 'mongoose';
import { TFaculty } from './faculty.interface';
import { TUserName } from '../student/student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: { types: String, required: true },
  middleName: { types: String, required: true },
  lastName: { types: String, required: true },
});

const facultySchema = new Schema<TFaculty>({
  id: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true },
  name: { type: userNameSchema, required: true },
  designation: { types: String, required: true },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  dateOfBirth: { type: Date },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo:{ type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImage: { type: String, required: true },
  academicDepartment: {type: Schema.Types.ObjectId},
  isDeleted: {type: Boolean, default: false}
}, {timestamps: true});

export const Faculty = model<TFaculty>("Faculty", facultySchema)