import { AcademicSemester } from './academicSemister.model';
import {
  TAcademicSemester,
  TAcademicSemesterNameCodeMapper,
} from './acadenicSemester.interface';

const createAcademicSemesterDB = async (payload: TAcademicSemester) => {
  const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const result = AcademicSemester.create(payload);
  return result;
};


const gteSingleAcademicSemesterDB = async (id: string) => {
    const result = await AcademicSemester.findOne({
        _id: id
    })

    return result
}

const gteAllAcademicSemesterDB = async() => {
    const result = await AcademicSemester.find()
    return result
}



const updateAcademicSemesterDB = async (payload: TAcademicSemester, id: string) => {

    const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
      Autumn: '01',
      Summer: '02',
      Fall: '03',
    };
  
    if (payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code) {
      throw new Error('Invalid Semester Code');
    }
  
    const result = AcademicSemester.findByIdAndUpdate({_id: id}, {$set: payload}, {new: true})
    return result;
  };







export const AcademicSemesterServices = {
  createAcademicSemesterDB,
  gteSingleAcademicSemesterDB,
  gteAllAcademicSemesterDB, 
  updateAcademicSemesterDB
};
