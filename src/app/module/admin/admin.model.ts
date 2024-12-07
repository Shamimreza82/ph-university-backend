import { model, Schema } from 'mongoose';
import { TAdmin } from './admin.interface';

const userNameSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const adminSchema = new Schema<TAdmin>(
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
    managementDepartment: { type: Schema.Types.ObjectId, ref: 'Department' },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Admin = model<TAdmin>('Admin', adminSchema);
