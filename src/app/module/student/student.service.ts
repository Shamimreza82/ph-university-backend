import mongoose from 'mongoose';
import { Student } from './student.model';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentDB = async (query: Record<string, unknown>) => {


  const queryObj = {...query}



  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

    const studentSearchableFields = ['email', 'name.firstName', 'presentAddress']
  ///{email: {$regex: query.searchTerm, $options: i}}


  ////////
const searchQuery = Student.find({
  $or: studentSearchableFields.map((field) => ({
    [field]: { $regex: searchTerm, $options: 'i' },
  })),
})

////filtering
const excludefilds = ['searchTerm', 'sort', "limit", "page", "fields"]
excludefilds.forEach(el => delete queryObj[el])

console.log({query}, {queryObj});

////search 
  const filterQuery = searchQuery.find(queryObj)
    .populate('user')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemester');

    let sort = 'createdAt'
    if(query?.sort){
      sort = query?.sort as string
    }
    
    ////// sort 
    const sortQuery = filterQuery.sort(sort)
    let page = 1
    let limit = 1
    let skip = 0

    if(query?.limit){
      limit = Number(query?.limit); 
      skip = (page-1)*limit
    }
    if(query.page){
      page = Number(query.page)
    }


    const paginateQuery = sortQuery.skip(skip)
   
    const limitQuery = paginateQuery.limit(limit)

   ////filds limiting
    let fields = '-__v'
    if(query.fields){
      fields = (query.fields as string).split(',').join(' ')
      console.log({fields});
    }

    const fieldsQuery = await limitQuery.select(fields)

  return fieldsQuery;
};





const getSingleStudentDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemester');
  return result;
};

const deleteStudentDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new Error('fail to deleted student');
    }
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    ).populate('user');

    if (!deleteStudent) {
      throw new Error('fail to deleted student');
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const updateStudentDB = async (id: string, payload: TStudent) => {
  const { name, guardian, localGuardian, ...remaining } = payload;
  console.log(name);
};

export const StudentService = {
  getAllStudentDB,
  getSingleStudentDB,
  deleteStudentDB,
  updateStudentDB,
};
