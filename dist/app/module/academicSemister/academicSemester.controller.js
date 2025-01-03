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
exports.AcademicSemesterController = void 0;
const sendRespons_1 = __importDefault(require("../../utils/sendRespons"));
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const academicSemister_service_1 = require("./academicSemister.service");
const createAcademicSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemister_service_1.AcademicSemesterServices.createAcademicSemesterDB(req.body);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Academic Semester Created Successfully',
        data: result,
    });
}));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllAcademicSemester = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemister_service_1.AcademicSemesterServices.gteAllAcademicSemesterDB();
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'All Academic Semester Successfully',
        data: result,
    });
});
const getSingleAcademicSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield academicSemister_service_1.AcademicSemesterServices.gteSingleAcademicSemesterDB(id);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Academic Semester Retrieve Successfully',
        data: result,
    });
}));
const updateAcademicSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield academicSemister_service_1.AcademicSemesterServices.updateAcademicSemesterDB(req.body, id);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Academic Semester Retrieve Successfully',
        data: result,
    });
}));
exports.AcademicSemesterController = {
    createAcademicSemester,
    getSingleAcademicSemester,
    getAllAcademicSemester,
    updateAcademicSemester
};
