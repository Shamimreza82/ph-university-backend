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
exports.AcademicDepartmentService = void 0;
const academicDepartment_model_1 = require("./academicDepartment.model");
const createAcademicDepartmentDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartment.create(payload);
    return result;
});
const getAllAcademicDepartmentDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartment.find().populate("academicFaculty");
    return result;
});
const getSingleAcademicDepartmentDB = (departmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartment.findById({ _id: departmentId }).populate("academicFaculty");
    return result;
});
const updateAcademicDepartmentDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartment.findByIdAndUpdate({ _id: id }, { $set: payload }, { new: true });
    return result;
});
exports.AcademicDepartmentService = {
    createAcademicDepartmentDB,
    getAllAcademicDepartmentDB,
    getSingleAcademicDepartmentDB,
    updateAcademicDepartmentDB
};
