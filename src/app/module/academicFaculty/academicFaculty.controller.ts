import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync"
import sendResponses from "../../utils/sendRespons";
import { AcademicFacultyService } from "./academicFaculty.service"



const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyService.createAcademicFacultyDB(req.body)

    sendResponses(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Create Academic Faculty Successfully',
        data: result,
      });
})


const getAllAcademicFaculty = catchAsync( async (req, res) => {
    const result = await AcademicFacultyService.getAllAcademicFacultyDB()

    sendResponses(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Get all Academic Faculty Successfully',
        data: result,
      });
})

const getSingleAcademicFaculty = catchAsync( async (req, res) => {
   const {facultyId} = req.params
    const result = await AcademicFacultyService.getSingleAcademicFacultyDB(facultyId)

    sendResponses(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Faculty Retrieve Successfully',
        data: result,
      });
})

const updateAcademicFaculty = catchAsync( async (req, res) => {
  const {facultyId} = req.params
  const result = await AcademicFacultyService.updateAcademicFacultyDB(facultyId, req.body)

    sendResponses(res, {
        statusCode: StatusCodes.OK,  
        success: true,
        message: 'Academic Faculty Retrieve Successfully',
        data: result,
      });
})

export const AcademicFacultyController = {
    createAcademicFaculty, 
    getAllAcademicFaculty, 
    getSingleAcademicFaculty, 
    updateAcademicFaculty
}