import express from 'express';
import { UserController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middelwares/validateRequest';
import { facultyValidation } from '../faculty/faculty.validation';
import { AdminValidation } from '../admin/admin.validation';
import auth from '../../middelwares/auth';
import { USER_ROLE } from './user.conostant';


const router = express.Router();



router.post(
  '/create-student', auth(USER_ROLE.admin),validateRequest(studentValidations.createStudentValidationSchema), UserController.createStudent,
);

router.post('/create-faculty',auth(USER_ROLE.admin), validateRequest(facultyValidation.createFacultyValidationSchema), UserController.createFaculty )

router.post('/create-admin', validateRequest(AdminValidation.createAdminValidationSchema),UserController.createAdmin )
export const UserRouter = router;
