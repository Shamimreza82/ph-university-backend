import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponses from "../../utils/sendRespons";
import { FacultiesServices } from "./faculty.service";


const getAllFaculties = catchAsync( async (req, res) => {
    const result = await FacultiesServices.getAllFacultiesDB()
    console.log(req.cookies);

    
    sendResponses(res, {
        statusCode: StatusCodes.OK, 
        success: true , 
        message: "get all data from faculty successfully", 
        data: result
    })
})

const getSingleFaculties = catchAsync( async (req, res) => {
    const {facultyId} = req.params
    const result = await FacultiesServices.getSingleFacultiesDB(facultyId)

    sendResponses(res, {
        statusCode: StatusCodes.OK, 
        success: true , 
        message: "faculty retrieve successfully", 
        data: result
    })
})

const updateFaculties = catchAsync( async (req, res) => {
    const {facultyId} = req.params
    const payload = req.body
    const result = await FacultiesServices.updateFacultiesDB(facultyId, payload)

    sendResponses(res, {
        statusCode: StatusCodes.OK, 
        success: true , 
        message: "update faculty successfully", 
        data: result
    })
})

const deleteFaculties = catchAsync( async (req, res) => {
    const {facultyId} = req.params
    const result = await FacultiesServices.deleteFacultiesDB(facultyId)

    sendResponses(res, {
        statusCode: StatusCodes.OK, 
        success: true, 
        message: "Delete faculty successfully", 
        data: result
    })
})



export const FacultyController = {
    getAllFaculties, 
    getSingleFaculties, 
    updateFaculties,
    deleteFaculties
}