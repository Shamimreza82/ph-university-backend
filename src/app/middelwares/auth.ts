import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { envFile } from '../../config';
import { TUserRole } from '../module/user/user.interface';




const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('you are not authorized');
    }

    if (token) {
      jwt.verify(
        token,
        envFile.jwt_access_secret as string,
        function (err, decoded) {
          if (err) {
            throw new Error('you are not authorized');
          }

          const role = (decoded as JwtPayload).role
        if(requiredRoles && !requiredRoles.includes(role)){
            throw new Error('you are not authorized role ');
        }


          req.user = decoded as Record<string, unknown>
          next()
        },
      );
    }

  });
};

export default auth;
