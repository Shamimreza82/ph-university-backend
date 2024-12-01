import sendResponses from '../../utils/sendRespons';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemister.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterDB(
    req.body,
  );

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});

const getAllAcademicSemester = async (req, res) => {

  const result = await AcademicSemesterServices.gteAllAcademicSemesterDB();
  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Semester Retrieve Successfully',
    data: result,
  });
};

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicSemesterServices.gteSingleAcademicSemesterDB(id);
  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Semester Retrieve Successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getSingleAcademicSemester,
  getAllAcademicSemester
};
