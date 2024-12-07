import express from 'express'
import { AdminController } from './admin.controller'
import validateRequest from '../../middelwares/validateRequest'
import { AdminValidation } from './admin.validation'


const route = express.Router()

route.get('/', AdminController.getAllAdmin)
route.get('/:adminId', AdminController.getSingleAdmin )
route.patch('/:adminId',validateRequest(AdminValidation.updateAdminValidationSchema), AdminController.updateAdmin )
route.delete('/:adminId', AdminController.deleteAdmin  )

export const AdminRoute = route