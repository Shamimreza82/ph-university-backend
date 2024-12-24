import z from 'zod';
import { userStatus } from './user.conostant';

const userSchemaValidation = z.object({
  password: z
    .string({ invalid_type_error: 'Name must be a string' })
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password must be at most 20 characters long')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one letter, one number, and no spaces',
    ),
});

const statusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...userStatus] as [string, ...string[]])
  })
});

export const UserValidation = {
  userSchemaValidation, 
  statusValidationSchema
}
