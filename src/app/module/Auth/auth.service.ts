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
    '10m',
  );

  const resetUiLink = `${envFile.reset_pass_Ui_link}?id=${user?.id}&token=${resetToken}`;

  const mailBody = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="color: #4CAF50; margin-bottom: 5px;">Password Reset Request</h2>
      <p style="font-size: 14px; color: #666;">Securely reset your password</p>
    </div>
    <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <p style="margin: 0 0 15px;">Dear User,</p>
      <p style="margin: 0 0 15px;">We received a request to reset your password. Please click the button below to reset your password:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${resetUiLink}" 
           style="display: inline-block; padding: 12px 25px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
          Reset Password
        </a>
      </div>
      <p style="margin: 0 0 15px;">If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
      <p style="margin: 0;">Thank you,<br><strong>Ph-University</strong></p>
    </div>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    <div style="font-size: 12px; color: #999; text-align: center;">
      <p style="margin: 0 0 10px;">If the button above doesn't work, copy and paste the following link into your browser:</p>
      <p style="margin: 0; word-break: break-all;">${resetUiLink}</p>
    </div>
  </div>
`;

  sendEmail(user?.email, mailBody);
};

const resetPassword = async (payload: {id: string, newPassword: string }, token: string) => {



  const user = await User.isUserExistByCustomId(payload?.id);

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


  const decode = jwt.verify(token, envFile.jwt_access_secret as string) as JwtPayload
  

  if(payload?.id !== decode?.userId){
    throw new Error("You aro not valid user")
  }
console.log(payload);
  const newHashPassword = await bcrypt.hash(payload?.newPassword, Number(envFile.salt_round_pass));

  await User.findOneAndUpdate(
    {
      id: decode?.userId,
      role: decode.role,
    },
    {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );
   

} 

export const AuthServices = {
  loginUser,
  changePassword,
  forgetPassword,
  resetPassword
};
