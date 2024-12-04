import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";


const createAcademicDepartmentDB =  async (payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload)
    return result; 
}

const getAllAcademicDepartmentDB =  async () => {
    const result = await AcademicDepartment.find().populate("academicFaculty") 
    return result; 
}

const getSingleAcademicDepartmentDB =  async (departmentId: string) => {
    const result = await AcademicDepartment.findById({_id: departmentId}).populate("academicFaculty") 
    return result; 
}

const updateAcademicDepartmentDB =  async (id: string, payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.findByIdAndUpdate({_id: id}, {$set: payload}, {new: true})
    return result; 
}


export const AcademicDepartmentService = {
    createAcademicDepartmentDB,
    getAllAcademicDepartmentDB,
    getSingleAcademicDepartmentDB,
    updateAcademicDepartmentDB
}


