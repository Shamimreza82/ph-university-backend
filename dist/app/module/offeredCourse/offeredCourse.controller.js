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
exports.OfferedCourseController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendRespons_1 = __importDefault(require("../../utils/sendRespons"));
const offeredCourse_service_1 = require("./offeredCourse.service");
const createOfferedCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_service_1.OfferedCourseService.createOfferedCourseDB(req.body);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Create Semester Registration Successfully',
        data: result,
    });
}));
const getAllOfferedCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_service_1.OfferedCourseService.getAllOfferedCourseDB(req.query);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Get all Semester Registration Successfully',
        data: result,
    });
}));
const getSingleOfferedCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield offeredCourse_service_1.OfferedCourseService.getSingleOfferedCourseDB(id);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Academic Semester Registration Retrieve Successfully',
        data: result,
    });
}));
// const updateOfferedCourse = catchAsync( async (req, res) => {
//   const {id} = req.params
//   const result = await OfferedCourseService.updateSemesterRegistrationDB(id, req.body)
//     sendResponses(res, {
//         statusCode: StatusCodes.OK,  
//         success: true,
//         message: 'Update Semester Registration Successfully',
//         data: result,
//       });
// })
exports.OfferedCourseController = {
    createOfferedCourse,
    getAllOfferedCourse,
    getSingleOfferedCourse
};
