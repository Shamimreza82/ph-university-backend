import express from 'express'
import validateRequest from '../../middelwares/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'

const route = express.Router()

route.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthController.loginUser )


export const AuthRouter = route