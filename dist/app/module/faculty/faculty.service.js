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
exports.FacultiesServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const faculty_model_1 = require("./faculty.model");
const user_model_1 = require("../user/user.model");
const getAllFacultiesDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = faculty_model_1.Faculty.find();
    return result;
});
const getSingleFacultiesDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = faculty_model_1.Faculty.findOne({ id });
    return result;
});
const updateFacultiesDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const faculty = payload.faculty;
    const result = faculty_model_1.Faculty.findOneAndUpdate({ id }, faculty, { new: true });
    return result;
});
const deleteFacultiesDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        yield session.startTransaction();
        const deleteUser = yield user_model_1.User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deleteUser) {
            throw new Error("failed to deleted user");
        }
        const deleteFaculty = yield faculty_model_1.Faculty.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deleteFaculty) {
            throw new Error("failed to deleted Faculty");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deleteFaculty;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
exports.FacultiesServices = {
    getAllFacultiesDB,
    getSingleFacultiesDB,
    updateFacultiesDB,
    deleteFacultiesDB,
};
