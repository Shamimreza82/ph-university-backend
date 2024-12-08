import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourchSearchAbleFilds } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';

const createCourseDB = async (payload: TCourse) => {
  const result = Course.create(payload);
  return result;
};

const getAllCoursesDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('prePerquisiteCourses.course'),
    query,
  )
    .search(CourchSearchAbleFilds)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCoursesDB = async (id: string) => {
  const result = Course.findById(id).populate('prePerquisiteCourses.course');
  return result;
};

const deletedCoursesDB = async (id: string) => {
  const result = Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const updateCourseDB = async (id: string, payload: Partial<TCourse>) => {
  const { prePerquisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    await session.startTransaction();

    const updatedBesicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      { new: true, runValidators: true, session },
    );

    if (!updatedBesicCourseInfo) {
      throw new Error('fail to update course');
    }

    ////checktheare is any pre requs course update

    if (prePerquisiteCourses && prePerquisiteCourses.length > 0) {
      const deletedPreRequisite = prePerquisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      console.log(deletedPreRequisite);

      const deletedPreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            prePerquisiteCourses: { course: { $in: deletedPreRequisite } },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!deletedPreRequisiteCourse) {
        throw new Error('fail to deleted course');
      }

      //// filter out the new corse fild
      const newPreRequisite = prePerquisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );
      const newPreRequisiteCourese = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { prePerquisiteCourses: { $each: newPreRequisite } },
        },
        { new: true, runValidators: true, session },
      );

      if (!newPreRequisiteCourese) {
        throw new Error('fail to Add course');
      }
    }

    const result = await Course.findById(id).populate(
      'prePerquisiteCourses.course',
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const assignFacultiesWithCourseDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
     courseId: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );

  return result;
};


/////////////////
const removeFacultiesFromCourseDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: {faculties: {$in: payload}}
    },
    {
      new: true,
    },
  );

  return result;
};

export const CourseServices = {
  createCourseDB,
  getAllCoursesDB,
  getSingleCoursesDB,
  deletedCoursesDB,
  updateCourseDB,
  assignFacultiesWithCourseDB,
  removeFacultiesFromCourseDB
};
