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
exports.OfferedCourseService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const academicFaculty_model_1 = require("../academicFaculty/academicFaculty.model");
const course_model_1 = require("../course/course.model");
const faculty_model_1 = require("../faculty/faculty.model");
const semesterRegistration_model_1 = require("../semesterRegistration/semesterRegistration.model");
const offeredCourse_model_1 = require("./offeredCourse.model");
const createOfferedCourseDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty } = payload;
    const isSemesterRegistration = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistration) {
        throw new Error('semester registration not found');
    }
    const academicSemester = isSemesterRegistration.academicSemester;
    const isAcademicFaculty = yield academicFaculty_model_1.AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFaculty) {
        throw new Error('Academic Faculty not found');
    }
    const isAcademicDepartment = yield academicDepartment_model_1.AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartment) {
        throw new Error('Academic Department not found');
    }
    const isCourse = yield course_model_1.Course.findById(course);
    if (!isCourse) {
        throw new Error('Course  not found');
    }
    const isFaculty = yield faculty_model_1.Faculty.findById(faculty);
    if (!isFaculty) {
        throw new Error('Faculty not found');
    }
    const result = yield offeredCourse_model_1.OfferedCourse.create(Object.assign(Object.assign({}, payload), { academicSemester }));
    return result;
});
const getAllOfferedCourseDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistrationQuery = new QueryBuilder_1.default(offeredCourse_model_1.OfferedCourse.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield semesterRegistrationQuery.modelQuery;
    return result;
});
const getSingleOfferedCourseDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_model_1.OfferedCourse.findById(id);
    return result;
});
// const updateOfferedCourseDB = async (
//   id: string,
//   payload: Partial<TOfferedCourse>,
// ) => {
//   return result;
// };
exports.OfferedCourseService = {
    createOfferedCourseDB,
    getAllOfferedCourseDB,
    getSingleOfferedCourseDB
};
