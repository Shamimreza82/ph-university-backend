import { Student } from './student.model';



const getAllStudentDB = async () => {
  const result = await Student.find().populate('user')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemester');
  return result;
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


const deleteStudentDB = (id: string) => {

}



export const StudentService = {
  getAllStudentDB,
  getSingleStudentDB,
  deleteStudentDB
};
