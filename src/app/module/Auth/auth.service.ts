import jwt from "jsonwebtoken";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt'
import { envFile } from "../../../config";

const loginUser = async (payload: TLoginUser) => {
   const user = await User.isUserExistByCustomId(payload?.id);

    if(!user){
        throw new Error("This user is not found")
    }


    //// chaking if the user is already deleted 
    const isDeletedUser = user?.isDeleted
    if(isDeletedUser){
        throw new Error("This user is Deleted")
    }

    //// chaking if the user is already deleted 
    const userStatus = user?.status
    if(userStatus === 'blocked'){
        throw new Error(`This user is Blocked`)
    }

    ////password check 
 
    if(!await User.isPasswordMatch(payload?.password, user?.password)){
        throw new Error(`Password dose not match`)
    }

    /// create token and send to the client 

    const jwtPayload = {
        userId: user?.id, 
        role: user?.role
    }

  const accessToken = jwt.sign(jwtPayload, envFile.jwt_access_secret as string, { expiresIn: '10d' });






    return {
        accessToken, 
        needsPasswordChange: user?.needsPasswordChange
    }
}

export const AuthServices = {
    loginUser
}