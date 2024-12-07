import express from 'express'
import { FacultyController } from './faculty.controller'
import validateRequest from '../../middelwares/validateRequest'
import { facultyValidation } from './faculty.validation'


const route = express.Router()

route.get('/', FacultyController.getAllFaculties )
route.get('/:facultyId',  FacultyController.getSingleFaculties )
route.patch('/:facultyId', validateRequest(facultyValidation.updateFacultyValidationSchema) , FacultyController.updateFaculties )
route.delete('/:facultyId',  FacultyController.deleteFaculties )

export const FacultyRoute = route