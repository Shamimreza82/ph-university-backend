import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponses from "../../utils/sendRespons";
import { AcademicDepartmentService } from "./academicDepartment.service";





const createAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentService.createAcademicDepartmentDB(req.body)

    sendResponses(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Create Academic Department Successfully',
        data: result,
      });
})


const getAllAcademicDepartment = catchAsync( async (req, res) => {
    const result = await AcademicDepartmentService.getAllAcademicDepartmentDB()

    sendResponses(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Get all Academic Department Successfully',
        data: result,
      });
})

const getSingleAcademicDepartment = catchAsync( async (req, res) => {
   const {departmentId} = req.params
    const result = await AcademicDepartmentService.getSingleAcademicDepartmentDB(departmentId)

    sendResponses(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Department Retrieve Successfully',
        data: result,
      });
})

const updateAcademicDepartment = catchAsync( async (req, res) => {
  const {departmentId} = req.params
  const result = await AcademicDepartmentService.updateAcademicDepartmentDB(departmentId, req.body)

    sendResponses(res, {
        statusCode: StatusCodes.OK,  
        success: true,
        message: 'Update Academic Department Successfully',
        data: result,
      });
})

export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartment, 
    getSingleAcademicDepartment, 
    updateAcademicDepartment
}