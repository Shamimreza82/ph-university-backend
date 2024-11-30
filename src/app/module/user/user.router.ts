import express from 'express';
import { UserController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middelwares/validateRequest';


const router = express.Router();



router.post(
  '/create-student',validateRequest(studentValidations.createStudentValidationSchema), UserController.createStudent,
);
export const UserRouter = router;
