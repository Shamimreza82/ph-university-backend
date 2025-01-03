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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyService = void 0;
const academicFaculty_model_1 = require("./academicFaculty.model");
const createAcademicFacultyDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.create(payload);
    return result;
});
const getAllAcademicFacultyDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.find();
    return result;
});
const getSingleAcademicFacultyDB = (facultyId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.findById({ _id: facultyId });
    return result;
});
const updateAcademicFacultyDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.findByIdAndUpdate({ _id: id }, { $set: payload }, { new: true });
    return result;
});
exports.AcademicFacultyService = {
    createAcademicFacultyDB,
    getAllAcademicFacultyDB,
    getSingleAcademicFacultyDB,
    updateAcademicFacultyDB
};
