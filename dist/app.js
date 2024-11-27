"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_router_1 = require("./app/module/student/student.router");
const user_router_1 = require("./app/module/user/user.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/users', user_router_1.UserRouter);
app.use('/api/v1', student_router_1.studentRouter);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('hello World');
}));
/////global error handler
app.use((err, req, res, next) => {
    const statusCode = 500;
    const message = err.message || "Something went wrong";
    return res.status(statusCode).json({
        success: false,
        message: message,
        error: err,
        stack: err.stack
    });
});
exports.default = app;
