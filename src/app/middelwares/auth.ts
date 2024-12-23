import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { envFile } from '../../config';
import { TUserRole } from '../module/user/user.interface';
import { User } from '../module/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('you are not authorized');
    }
    const decoded = jwt.verify(
      token,
      envFile.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    ///
    const user = await User.isUserExistByCustomId(userId);

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

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error('you are not authorized role ');
    }

    if (user.passwordChangeAt && (await User.isJWTIssuedBefourChangerd( user?.passwordChangeAt, iat as number,))
    ) {
      throw new Error('your token is expire, you are unauthorize');
    }
      req.user = decoded as Record<string, unknown>;
    next();

    // if (token) {
    //   jwt.verify(
    //     token,
    //     envFile.jwt_access_secret as string,
    //     function (err, decoded) {
    //       if (err) {
    //         throw new Error('you are not authorized');
    //       }

    //       const role = (decoded as JwtPayload).role;
    //       if (requiredRoles && !requiredRoles.includes(role)) {
    //         throw new Error('you are not authorized role ');
    //       }

    //       req.user = decoded as Record<string, unknown>;
    //       next();
    //     },
    //   );
    // }
  });
};

export default auth;
