import { AcademicSemester } from "./academicSemister.model";
import { TAcademicSemester } from "./acadenicSemester.interface";

const createAcademicSemesterDB = async (payload: TAcademicSemester) => {
    const result = AcademicSemester.create(payload)
    return result
}

export const AcademicSemesterServices = {
    createAcademicSemesterDB
}