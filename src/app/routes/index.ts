import express from 'express' 
import { UserRouter } from '../module/user/user.router'
import { StudentRouter} from '../module/student/student.router'
import { AcademicSemesterRoutes } from '../module/academicSemister/academicSemester.route'
import { AcademicFacultyRouter } from '../module/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRouter } from '../module/academicDepartment/academicDepartment.route'

const router = express.Router()


const moduleRoutes = [
    {
        path: '/users', 
        route: UserRouter
    }, 
    {
        path: '/students', 
        route: StudentRouter
    }, 
    {
        path: '/academic-semesters', 
        route: AcademicSemesterRoutes
    },  
    {
        path: '/academic-faculty', 
        route: AcademicFacultyRouter
    },  
    {
        path: '/academic-department', 
        route: AcademicDepartmentRouter
    },  

]


moduleRoutes.forEach(route => router.use(route.path, route.route))


export default router