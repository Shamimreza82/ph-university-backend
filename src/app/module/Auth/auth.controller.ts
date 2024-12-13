import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponses from "../../utils/sendRespons";
import { AuthServices } from "./auth.service";



const loginUser = catchAsync(async (req, res) => {

    const result = await AuthServices.loginUser(req.body)

    sendResponses(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User login Successfully',
        data: result,
      });
})


export const AuthController = {
    loginUser
    }