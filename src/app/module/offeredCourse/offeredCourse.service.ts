import QueryBuilder from '../../builder/QueryBuilder';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';

const createOfferedCourseDB = async (payload: TOfferedCourse) => {

  const {semesterRegistration, academicFaculty, academicDepartment,course, faculty} = payload
  const isSemesterRegistration = await SemesterRegistration.findById(semesterRegistration)
  if(!isSemesterRegistration){
    throw new Error('semester registration not found')
  }

  const academicSemester = isSemesterRegistration.academicSemester

  const isAcademicFaculty = await AcademicFaculty.findById(academicFaculty)
  if(!isAcademicFaculty){
    throw new Error('Academic Faculty not found')
  }

  const isAcademicDepartment = await AcademicDepartment.findById(academicDepartment)
  if(!isAcademicDepartment){
    throw new Error('Academic Department not found')
  }

  const isCourse = await Course.findById(course)
  if(!isCourse){
    throw new Error('Course  not found')
  }

  const isFaculty = await Faculty.findById(faculty)
  if(!isFaculty){
    throw new Error('Faculty not found')
  }


  const result = await OfferedCourse.create({...payload, academicSemester});
  return result;
};

const getAllOfferedCourseDB = async (query: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    OfferedCourse.find(),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

// const updateOfferedCourseDB = async (
//   id: string,
//   payload: Partial<TOfferedCourse>,
// ) => {



//   return result;
// };

export const OfferedCourseService = {
createOfferedCourseDB, 
getAllOfferedCourseDB, 
getSingleOfferedCourseDB
};
