import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middelwares/validateRequest';
import { facultyValidation } from '../faculty/faculty.validation';
import { AdminValidation } from '../admin/admin.validation';
import auth from '../../middelwares/auth';
import { USER_ROLE } from './user.conostant';
import { UserValidation } from './user.validation';
import { upload } from '../../utils/sendimageTocliydinary';


const router = express.Router();



router.post(
  '/create-student', auth('admin'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction)=> {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post('/create-faculty', validateRequest(facultyValidation.createFacultyValidationSchema), UserController.createFaculty )

router.post('/create-admin', validateRequest(AdminValidation.createAdminValidationSchema),UserController.createAdmin )

router.patch('/change-status/:id', auth("admin"), validateRequest(UserValidation.statusValidationSchema), UserController.changeStatus )

router.get('/me', auth('student', 'faculty', 'admin'), UserController.getMe)


export const UserRouter = router;
