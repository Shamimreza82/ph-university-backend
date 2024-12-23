import express from 'express';
import { StudentController } from './student.controller';
import { studentValidations } from './student.validation';
import validateRequest from '../../middelwares/validateRequest';
import auth from '../../middelwares/auth';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.get('/', auth('admin', 'faculty'), StudentController.allStudents);
router.delete('/:id', StudentController.deletedStudent);
router.patch('/:id', validateRequest(studentValidations.updateStudentValidationSchema), StudentController.updateStudent);

export const StudentRouter = router;
