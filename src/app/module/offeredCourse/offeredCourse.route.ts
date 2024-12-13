import express from 'express';
import validateRequest from '../../middelwares/validateRequest';
import { OfferedCourseValidation } from './offeredCourse.validation';
import { OfferedCourseController } from './offeredCourse.controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidation.offeredCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);

router.get('/', OfferedCourseController.getAllOfferedCourse);

router.get('/:id', OfferedCourseController.getSingleOfferedCourse);

// router.patch(
//   '/:id',
//   validateRequest(
//     SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
//   ),
//   SemesterRegistrationController.updateSemesterRegistration,
// );

export const OfferedCourseRouter = router;
