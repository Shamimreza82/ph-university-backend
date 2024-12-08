import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponses from "../../utils/sendRespons";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {

  const result = await CourseServices.createCourseDB(req.body);

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  console.log(req.params);
  const result = await CourseServices.getAllCoursesDB(req.query);

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course are retrieved successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await CourseServices.getSingleCoursesDB(id);

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseDB(
    id,
    req.body,
  );

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});


const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
      await CourseServices.deletedCoursesDB(id);
  
    sendResponses(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Course deleted successfully',
      data: result,
    });
  });



const assignFacultiesWithCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const {faculties} = req.body
    const result =  await CourseServices.assignFacultiesWithCourseDB(courseId,faculties);
  
    sendResponses(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Faculties assign successfully',
      data: result,
    });
  });


const removeFacultiesfromCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const {faculties} = req.body
    const result =  await CourseServices.removeFacultiesFromCourseDB(courseId,faculties);
  
    sendResponses(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Faculties remove successfully',
      data: result,
    });
  });




export const CourseControllers = {
    createCourse,
    getSingleCourse,
    getAllCourse,
    deleteCourse, 
    updateCourse,
    assignFacultiesWithCourse, 
    removeFacultiesfromCourse
};
