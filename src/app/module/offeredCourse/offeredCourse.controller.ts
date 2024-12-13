import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponses from "../../utils/sendRespons";
import { OfferedCourseService } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req, res) => {



    const result = await OfferedCourseService.createOfferedCourseDB(req.body)

    sendResponses(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Create Semester Registration Successfully',
        data: result,
      });
})


const getAllOfferedCourse = catchAsync( async (req, res) => {
  
    const result = await OfferedCourseService.getAllOfferedCourseDB(req.query)

    sendResponses(res, {
        statusCode: StatusCodes.OK,  
        success: true,
        message: 'Get all Semester Registration Successfully',
        data: result,
      });
})

const getSingleOfferedCourse = catchAsync( async (req, res) => {
   const {id} = req.params
    const result = await OfferedCourseService.getSingleOfferedCourseDB(id)

    sendResponses(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Semester Registration Retrieve Successfully',
        data: result,
      });
})

// const updateOfferedCourse = catchAsync( async (req, res) => {
//   const {id} = req.params
//   const result = await OfferedCourseService.updateSemesterRegistrationDB(id, req.body)

//     sendResponses(res, {
//         statusCode: StatusCodes.OK,  
//         success: true,
//         message: 'Update Semester Registration Successfully',
//         data: result,
//       });
// })

export const OfferedCourseController = {
createOfferedCourse, 
getAllOfferedCourse, 
getSingleOfferedCourse
}