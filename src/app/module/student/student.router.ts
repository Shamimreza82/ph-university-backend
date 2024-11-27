import express from 'express'
import { studentController } from './student.controller'

const router = express.Router()

router.get('/students/:id',studentController.getSingleStudent)
router.get('/students',studentController.allStudents)


export const studentRouter = router