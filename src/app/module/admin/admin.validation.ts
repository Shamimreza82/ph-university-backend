import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
});

const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    admin: z.object({
      id: z.string().optional(),
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

const updateAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      // id: z.string().optional(),
      name: userNameSchema.optional(),
      designation: z.string({
        required_error: 'user is require',
      }).optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth:z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().min(10).max(15).optional(),
      emergencyContactNo: z.string().min(10).max(15).optional(),
      presentAddress: z.string().min(1).optional(),
      permanentAddress: z.string().min(1).optional(),
      profileImage: z.string().url().optional(),
      // academicDepartment: z.instanceof(Types.ObjectId).optional(),
      isDeleted: z.boolean(),
    }),
  }),
});



export const AdminValidation = {
    createAdminValidationSchema,
    updateAdminValidationSchema
};
