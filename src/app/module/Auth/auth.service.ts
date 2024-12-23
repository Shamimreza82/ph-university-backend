import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { envFile } from '../../../config';
import bcrypt from 'bcrypt';
import createToken from './auth.ults';
import { sendEmail } from '../../utils/sendEmail';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByCustomId(payload?.id);

  if (!user) {
    throw new Error('This user is not found');
  }

  //// chaking if the user is already deleted
  const isDeletedUser = user?.isDeleted;
  if (isDeletedUser) {
    throw new Error('This user is Deleted');
  }

  //// chaking if the user is already deleted
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new Error(`This user is Blocked`);
  }

  ////password check

  if (!(await User.isPasswordMatch(payload?.password, user?.password))) {
    throw new Error(`Password dose not match`);
  }

  /// create token and send to the client

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  // const accessToken = jwt.sign(
  //   jwtPayload,
  //   envFile.jwt_access_secret as string,
  //   { expiresIn: '10d' },
  // );

  // const refreshToken = jwt.sign(
  //   jwtPayload,
  //   envFile.jwt_refrishAccess_secret as string,
  //   { expiresIn: '10d' },
  // );

  const assessToken = createToken(
    jwtPayload,
    envFile.jwt_access_secret as string,
    envFile.JWT_ACCESS_EXPIRE_IN as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    envFile.jwt_refrishAccess_secret as string,
    envFile.JWT_REFRESH_EXPIRE_IN as string,
  );

  return {
    assessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  console.log(userData);
  const user = await User.isUserExistByCustomId(userData?.userId);

  if (!user) {
    throw new Error('This user is not found');
  }

  //// chaking if the user is already deleted
  const isDeletedUser = user?.isDeleted;
  if (isDeletedUser) {
    throw new Error('This user is Deleted');
  }

  //// chaking if the user is already deleted
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new Error(`This user is Blocked`);
  }

  ////password check

  if (!(await User.isPasswordMatch(payload?.oldPassword, user?.password))) {
    throw new Error(`Password dose not match`);
  }

  ///// has new password
  const newHashPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(envFile.salt_round_pass),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );

  return null;
};



const forgetPassword = async (userId: string) => {

  const user = await User.isUserExistByCustomId(userId);

  if (!user) {
    throw new Error('This user is not found');
  }

  const isDeletedUser = user?.isDeleted;
  if (isDeletedUser) {
    throw new Error('This user is Deleted');
  }

  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new Error(`This user is Blocked`);
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };


  const resetToken = createToken(
    jwtPayload,
    envFile.jwt_access_secret as string,
    '10m'
  );

  const resetUiLink = `${envFile.reset_pass_Ui_link}?id=${user?.id}&token=${resetToken}`
  sendEmail(user?.email,resetUiLink);

};

export const AuthServices = {
  loginUser,
  changePassword,
  forgetPassword
};
