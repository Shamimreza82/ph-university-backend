
import { TAcademicSemester } from '../academicSemister/acadenicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async (role:string) => {
  const lastStudent = await User.findOne(
    {
      role: role,
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  //203001   0001
  return lastStudent?.id ? lastStudent.id : undefined;
};

const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();

  const lastStudentId = await findLastStudentId('student'); // student id 2030010001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); // 01
  const lastStudentYear = lastStudentId?.substring(0, 4); // 2030
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6); /// 0001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

export default generateStudentId;


///////////
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const findFacultyLastId = async (): Promise<string | any> => {
    const lastStudent = await User.findOne(
      {
        role: 'faculty',
      },
      {
        id: 1,
        _id: 0,
      },
    )
      .sort({
        createdAt: -1,
      }).lean()
    //203001   0001
    return lastStudent?.id ? lastStudent?.id : undefined
  };


export const generateFacultyId = async (Prefix: string) => {
  let id = await findFacultyLastId()
  if(id === undefined){
    id = "F-0000"
  }
  const formateId = Number((id as string).split('-')[1])
  const number = (Number(formateId)+ 1).toString().padStart(4, '0') || '0001'
  const newNumber = number || '0001'
  const newId = `${Prefix}-${newNumber}`;
  return newId;
};




//////////////
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const findAdminLastId = async (): Promise<string | any> => {
    const lastStudent = await User.findOne(
      {
        role: 'admin',
      },
      {
        id: 1,
        _id: 0,
      },
    )
      .sort({
        createdAt: -1,
      }).lean()
    //203001   0001
    return lastStudent?.id ? lastStudent?.id : undefined
  };




export const generateAdminId = async (Prefix: string) => {
  
  const id = await findAdminLastId()
  console.log(id);
  const formateId = Number((id as string).split('-')[1])
  const number = (Number(formateId)+ 1).toString().padStart(4, '0') || '0001'
  const newNumber = number || '0001'
  const newId = `${Prefix}-${newNumber}`;
  return newId;
};
