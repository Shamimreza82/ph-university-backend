import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.allStudents);
router.delete('/:id', StudentController.deletedStudent);
router.patch('/:id', StudentController.updateStudent);

export const StudentRouter = router;
