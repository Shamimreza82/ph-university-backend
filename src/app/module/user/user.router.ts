import express from 'express';
import { UserController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middelwares/validateRequest';
import { facultyValidation } from '../faculty/faculty.validation';


const router = express.Router();



router.post(
  '/create-student',validateRequest(studentValidations.createStudentValidationSchema), UserController.createStudent,
);

router.post('/create-faculty', validateRequest(facultyValidation.facultyValidationSchema), UserController.createFaculty )
export const UserRouter = router;
