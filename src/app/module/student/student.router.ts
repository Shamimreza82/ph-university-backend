import express from 'express';
import { StudentController } from './student.controller';
import { studentValidations } from './student.validation';
import validateRequest from '../../middelwares/validateRequest';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.allStudents);
router.delete('/:id', StudentController.deletedStudent);
router.patch('/:id', validateRequest(studentValidations.updateStudentValidationSchema), StudentController.updateStudent);

export const StudentRouter = router;
