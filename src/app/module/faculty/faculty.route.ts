import express from 'express'
import { FacultyController } from './faculty.controller'

const route = express.Router()

route.get('/', FacultyController.getAllFaculties )

route.get('/:facultyId', FacultyController.getSingleFaculties )


export const FacultyRoute = route