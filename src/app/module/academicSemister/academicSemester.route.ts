import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middelwares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

// router.get('/students/:id', studentController.getSingleStudent);
// router.get('/students', studentController.allStudents);

export const AcademicSemesterRoutes = router;
