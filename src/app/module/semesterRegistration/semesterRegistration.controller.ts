import { StatusCodes } from "http-status-codes";
import sendResponses from "../../utils/sendRespons";
import catchAsync from "../../utils/catchAsync";
import { SemesterRegistrationService } from "./semesterRegistration.service";



const createSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationService.createSemesterRegistrationDB(req.body)

    sendResponses(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Create Semester Registration Successfully',
        data: result,
      });
})


const getAllSemesterRegistration = catchAsync( async (req, res) => {
  
    const result = await SemesterRegistrationService.getAllSemesterRegistrationDB(req.query)

    sendResponses(res, {
        statusCode: StatusCodes.OK,  
        success: true,
        message: 'Get all Semester Registration Successfully',
        data: result,
      });
})

const getSingleSemesterRegistration = catchAsync( async (req, res) => {
   const {id} = req.params
    const result = await SemesterRegistrationService.getSingleSemesterRegistrationDB(id)

    sendResponses(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Semester Registration Retrieve Successfully',
        data: result,
      });
})

const updateSemesterRegistration = catchAsync( async (req, res) => {
  const {id} = req.params
  const result = await SemesterRegistrationService.updateSemesterRegistrationDB(id, req.body)

    sendResponses(res, {
        statusCode: StatusCodes.OK,  
        success: true,
        message: 'Update Semester Registration Successfully',
        data: result,
      });
})

export const SemesterRegistrationController = {
    createSemesterRegistration,
    updateSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration

}