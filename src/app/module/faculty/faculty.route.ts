import express from 'express'
import { FacultyController } from './faculty.controller'
import validateRequest from '../../middelwares/validateRequest'
import { facultyValidation } from './faculty.validation'
import auth from '../../middelwares/auth'
import { USER_ROLE } from '../user/user.conostant'


const route = express.Router()

route.get('/',auth(USER_ROLE.admin, USER_ROLE.faculty), FacultyController.getAllFaculties )
route.get('/:facultyId',  FacultyController.getSingleFaculties )
route.patch('/:facultyId', validateRequest(facultyValidation.updateFacultyValidationSchema) , FacultyController.updateFaculties )
route.delete('/:facultyId',  FacultyController.deleteFaculties )

export const FacultyRoute = route