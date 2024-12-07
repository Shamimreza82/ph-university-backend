import { Types } from 'mongoose';
import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
});

const facultyValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    faculty: z.object({
      id: z.string(),
      // user: z.string({
      //   required_error: 'user is require',
      //   invalid_type_error: 'User Id is an ObjectID ',
      // }),
      name: userNameSchema,
      designation: z.string({
        required_error: 'user is require',
      }),
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth:z.string().optional(),
      email: z.string().email(),
      contactNo: z.string().min(10).max(15),
      emergencyContactNo: z.string().min(10).max(15),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      profileImage: z.string().url(),
      // academicDepartment: z.instanceof(Types.ObjectId).optional(),
      isDeleted: z.boolean(),
    }),
  }),
});

export const facultyValidation = {
  facultyValidationSchema,
};
