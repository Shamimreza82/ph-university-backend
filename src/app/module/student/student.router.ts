import express from 'express';
import { StudentController } from './student.controller';


const router = express.Router();

router.get('/students/:id', StudentController.getSingleStudent);
router.get('/students', StudentController.allStudents);
router.delete('/students/:id', StudentController.deletedStudent);

export const studentRouter = router;
