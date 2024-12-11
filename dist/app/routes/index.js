"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("../module/user/user.router");
const student_router_1 = require("../module/student/student.router");
const academicSemester_route_1 = require("../module/academicSemister/academicSemester.route");
const academicFaculty_route_1 = require("../module/academicFaculty/academicFaculty.route");
const academicDepartment_route_1 = require("../module/academicDepartment/academicDepartment.route");
const faculty_route_1 = require("../module/faculty/faculty.route");
const admin_route_1 = require("../module/admin/admin.route");
const course_route_1 = require("../module/course/course.route");
const semesterRegistration_route_1 = require("../module/semesterRegistration/semesterRegistration.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_router_1.UserRouter
    },
    {
        path: '/students',
        route: student_router_1.StudentRouter
    },
    {
        path: '/academic-semesters',
        route: academicSemester_route_1.AcademicSemesterRoutes
    },
    {
        path: '/academic-faculty',
        route: academicFaculty_route_1.AcademicFacultyRouter
    },
    {
        path: '/academic-department',
        route: academicDepartment_route_1.AcademicDepartmentRouter
    },
    {
        path: '/faculties',
        route: faculty_route_1.FacultyRoute
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoute
    },
    {
        path: '/courses',
        route: course_route_1.CourseRoutes
    },
    {
        path: '/semester-registration',
        route: semesterRegistration_route_1.SemesterRegistrationRouter
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
