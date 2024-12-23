import express from 'express';
import validateRequest from '../../middelwares/validateRequest';
import { AuthValidation } from './auth.validation';
import auth from '../../middelwares/auth';
import { USER_ROLE } from '../user/user.conostant';
import { AuthController } from './auth.controller';

const route = express.Router();

route.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);
route.post(
  '/change-password',
  auth(USER_ROLE.faculty, USER_ROLE.admin, USER_ROLE.student),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword,
);

route.post('/forget-password', validateRequest(AuthValidation.forgetPasswordValidationSchema), AuthController.forgetPassword)

//TODO need word refresh toke hare 

export const AuthRouter = route;
