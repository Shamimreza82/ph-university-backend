import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponses from '../../utils/sendRespons';
import { AuthServices } from './auth.service';
import { envFile } from '../../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, assessToken, needsPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: envFile.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User login Successfully',
    data: {
      assessToken,
      needsPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'password is updated successfully Successfully',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {

  const {id} = req.body
  const result = await AuthServices.forgetPassword(id);

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'forget password link is genarated',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {

  const token = req.headers.authorization

  const result = await AuthServices.resetPassword(req.body, token as string);

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password reset successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
  forgetPassword, 
  resetPassword
};
