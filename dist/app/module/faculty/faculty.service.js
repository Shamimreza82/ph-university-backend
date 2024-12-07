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
exports.FacultiesServices = void 0;
const faculty_model_1 = require("./faculty.model");
const getAllFacultiesDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = faculty_model_1.Faculty.find();
    return result;
});
const getSingleFacultiesDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = faculty_model_1.Faculty.findOne({ id });
    return result;
});
exports.FacultiesServices = {
    getAllFacultiesDB,
    getSingleFacultiesDB
};
