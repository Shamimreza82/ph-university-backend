import { z } from 'zod';

// User Name Schema
const userNameZodSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  middleName: z.string().nonempty("Middle name is required"),
  lastName: z.string().nonempty("Last name is required"),
});

// Guardian Schema
const guardianZodSchema = z.object({
  fatherName: z.string().nonempty("Father's name is required"),
  fatherOccupation: z.string().nonempty("Father's occupation is required"),
  fatherContactNo: z
    .string()
    .nonempty("Father's contact number is required")
    .regex(/^\d{10,15}$/, "Invalid contact number format"),
  motherName: z.string().nonempty("Mother's name is required"),
  motherOccupation: z.string().nonempty("Mother's occupation is required"),
  motherContactNo: z
    .string()
    .nonempty("Mother's contact number is required")
    .regex(/^\d{10,15}$/, "Invalid contact number format"),
});

// Local Guardian Schema
const localGuardianZodSchema = z.object({
  name: z.string().nonempty("Local guardian's name is required"),
  occupation: z.string().nonempty("Local guardian's occupation is required"),
  contactNo: z
    .string()
    .nonempty("Local guardian's contact number is required")
    .regex(/^\d{10,15}$/, "Invalid contact number format"),
  address: z.string().nonempty("Address is required"),
});

// Student Schema
const studentValidationSchema = z.object({
  id: z.string().nonempty("ID is required"),
  user: z.string().nonempty("User reference is required").regex(/^[a-f\d]{24}$/i, "Invalid ObjectId format"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  name: userNameZodSchema,
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: "Gender must be 'male', 'female', or 'other'" }),
  }),
  dateOfBirth: z
    .string()
    .optional()
    .refine(val => !val || !isNaN(Date.parse(val)), "Invalid date format"),
  email: z.string().email("Invalid email format"),
  contactNo: z
    .string()
    .nonempty("Contact number is required")
    .regex(/^\d{10,15}$/, "Invalid contact number format"),
  emergencyContactNo: z
    .string()
    .nonempty("Emergency contact number is required")
    .regex(/^\d{10,15}$/, "Invalid contact number format"),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().nonempty("Present address is required"),
  permanentAddress: z.string().nonempty("Permanent address is required"),
  guardian: guardianZodSchema,
  localGuardian: localGuardianZodSchema,
  profileImg: z.string().url("Invalid URL").optional(),
  isDeleted: z.boolean().default(false),
});


export default studentValidationSchema;