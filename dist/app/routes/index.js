"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("../module/user/user.router");
const student_router_1 = require("../module/student/student.router");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_router_1.UserRouter
    },
    {
        path: '/students',
        route: student_router_1.studentRouter
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
console.log(moduleRoutes);
exports.default = router;
