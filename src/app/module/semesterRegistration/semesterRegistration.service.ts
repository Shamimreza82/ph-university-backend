import QueryBuilder from '../../builder/QueryBuilder';
import { AcademicSemester } from '../academicSemister/academicSemister.model';
import { RegistrationStatus } from './semesterRegistration.conostance';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationDB = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester;

  const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
    $or: [{status: RegistrationStatus.UPCOMING}, {status: RegistrationStatus.ONGOING}]
  })
  if(isThereAnyUpcomingOrOngoingSemester){
    throw new Error(`There is already an ${isThereAnyUpcomingOrOngoingSemester.status} register semester`);
  }


  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExist) {
    throw new Error('This Academic Semester not found');
  }

  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExist) {
    throw new Error('This  Semester is already Exist');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationDB = async (query: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery
  return result;
};



const getSingleSemesterRegistrationDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id).populate('academicSemester')
  return result;
};





const updateSemesterRegistrationDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExist) {
    throw new Error('This  Semester is not found');
  }


  ////if the requited semester registration is ended will not update anything
const currentSemesterStatus = isSemesterRegistrationExist?.status 
const requestedStatus = payload?.status
if(currentSemesterStatus === RegistrationStatus.ENDED){
  throw new Error(`This Semester is already ${currentSemesterStatus}`);
}


/// UPCOMING >> ONGOING >> ENDED
if(currentSemesterStatus === RegistrationStatus.UPCOMING && requestedStatus === RegistrationStatus.ENDED ){
  throw new Error(`you can not change ${currentSemesterStatus} to ${requestedStatus}`);
}

if(currentSemesterStatus === RegistrationStatus.UPCOMING && requestedStatus === RegistrationStatus.ONGOING){
  throw new Error(`you can not change ${currentSemesterStatus} to ${requestedStatus}`);
}


  const result = await SemesterRegistration.findByIdAndUpdate(
    { _id: id },
    { $set: payload },
    { new: true },
  );
  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistrationDB,
  getAllSemesterRegistrationDB,
  getSingleSemesterRegistrationDB,
  updateSemesterRegistrationDB,
};
