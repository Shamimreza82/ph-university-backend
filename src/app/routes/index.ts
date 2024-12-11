import express from 'express' 
import { UserRouter } from '../module/user/user.router'
import { StudentRouter} from '../module/student/student.router'
import { AcademicSemesterRoutes } from '../module/academicSemister/academicSemester.route'
import { AcademicFacultyRouter } from '../module/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRouter } from '../module/academicDepartment/academicDepartment.route'
import { FacultyRoute } from '../module/faculty/faculty.route'
import { AdminRoute } from '../module/admin/admin.route'
import { CourseRoutes } from '../module/course/course.route'
import { SemesterRegistrationRouter } from '../module/semesterRegistration/semesterRegistration.route'



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
    {
        path: '/faculties', 
        route: FacultyRoute
    }, 
    {
        path: '/admin', 
        route: AdminRoute
    }, 
    {
        path: '/courses', 
        route: CourseRoutes
    }, 
    {
        path: '/semester-registration', 
        route: SemesterRegistrationRouter
    }, 

]


moduleRoutes.forEach(route => router.use(route.path, route.route))


export default router