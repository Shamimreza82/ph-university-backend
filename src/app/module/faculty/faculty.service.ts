import { Faculty } from "./faculty.model"


const getAllFacultiesDB = async() => {
    const result = Faculty.find()
    return result
}


const getSingleFacultiesDB = async(id: string) => {
    const result = Faculty.findOne({id})
    return result
}

export const FacultiesServices = {
    getAllFacultiesDB, 
    getSingleFacultiesDB
}
