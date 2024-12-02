import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";


const createAcademicFacultyDB =  async (payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payload)
    return result; 
}

const getAllAcademicFacultyDB =  async () => {
    const result = await AcademicFaculty.find()
    return result; 
}

const getSingleAcademicFacultyDB =  async (facultyId: string) => {
    const result = await AcademicFaculty.findById({_id: facultyId})
    return result; 
}

const updateAcademicFacultyDB =  async (id: string, payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.findByIdAndUpdate({_id: id}, {$set: payload}, {new: true})
    return result; 
}


export const AcademicFacultyService = {
    createAcademicFacultyDB,
    getAllAcademicFacultyDB, 
    getSingleAcademicFacultyDB, 
    updateAcademicFacultyDB
}


