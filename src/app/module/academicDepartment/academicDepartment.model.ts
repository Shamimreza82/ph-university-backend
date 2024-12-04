import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import statuscode from 'http-status-codes';
import AppError from '../../errors/AppError';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function () {
  const isExistDepartment = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isExistDepartment) {
    throw new Error('Department is already exist');
  }
});

academicDepartmentSchema.pre('findOneAndUpdate', async function () {
  const query = this.getQuery();
  const isDepartmentExit = await AcademicDepartment.findOne(query._id);
  if (!isDepartmentExit) {
    throw new AppError(statuscode.NOT_FOUND, "this department doesn't exist");
  }
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
