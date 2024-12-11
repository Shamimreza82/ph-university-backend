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
exports.SemesterRegistrationService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const academicSemister_model_1 = require("../academicSemister/academicSemister.model");
const semesterRegistration_model_1 = require("./semesterRegistration.model");
const createSemesterRegistrationDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = payload === null || payload === void 0 ? void 0 : payload.academicSemester;
    const isThereAnyUpcomingOrOngoingSemester = yield semesterRegistration_model_1.SemesterRegistration.findOne({
        $or: [{ status: "UPCOMING" }, { status: "ONGOING" }]
    });
    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new Error(`There is already an ${isThereAnyUpcomingOrOngoingSemester.status} register semester`);
    }
    const isAcademicSemesterExist = yield academicSemister_model_1.AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExist) {
        throw new Error('This Academic Semester not found');
    }
    const isSemesterRegistrationExist = yield semesterRegistration_model_1.SemesterRegistration.findOne({
        academicSemester,
    });
    if (isSemesterRegistrationExist) {
        throw new Error('This  Semester is already Exist');
    }
    const result = yield semesterRegistration_model_1.SemesterRegistration.create(payload);
    return result;
});
const getAllSemesterRegistrationDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistrationQuery = new QueryBuilder_1.default(semesterRegistration_model_1.SemesterRegistration.find().populate('academicSemester'), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield semesterRegistrationQuery.modelQuery;
    return result;
});
const getSingleSemesterRegistrationDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_model_1.SemesterRegistration.findById(id).populate('academicSemester');
    return result;
});
const updateSemesterRegistrationDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //// c
    ////if the requited semester registration is ended will not update anything
    console.log(id);
    const requestedSemester = yield semesterRegistration_model_1.SemesterRegistration.findById(id);
    if ((requestedSemester === null || requestedSemester === void 0 ? void 0 : requestedSemester.status) === "ENDED") {
        throw new Error(`This Semester is already ${requestedSemester === null || requestedSemester === void 0 ? void 0 : requestedSemester.status}`);
    }
    const result = yield semesterRegistration_model_1.SemesterRegistration.findByIdAndUpdate({ _id: id }, { $set: payload }, { new: true });
    return result;
});
exports.SemesterRegistrationService = {
    createSemesterRegistrationDB,
    getAllSemesterRegistrationDB,
    getSingleSemesterRegistrationDB,
    updateSemesterRegistrationDB,
};
