import express from 'express' 
import { UserRouter } from '../module/user/user.router'
import { studentRouter } from '../module/student/student.router'

const router = express.Router()


const moduleRoutes = [
    {
        path: '/users', 
        route: UserRouter
    }, 
    {
        path: '/students', 
        route: studentRouter
    }, 

]


moduleRoutes.forEach(route => router.use(route.path, route.route))


console.log(moduleRoutes);

export default router