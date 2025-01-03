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
exports.StudentService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("./student.model");
const user_model_1 = require("../user/user.model");
const getAllStudentDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, query);
    let searchTerm = '';
    if (query === null || query === void 0 ? void 0 : query.searchTerm) {
        searchTerm = query === null || query === void 0 ? void 0 : query.searchTerm;
    }
    const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];
    ///{email: {$regex: query.searchTerm, $options: i}}
    ////////
    const searchQuery = student_model_1.Student.find({
        $or: studentSearchableFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' },
        })),
    });
    ////filtering
    const excludefilds = ['searchTerm', 'sort', "limit", "page", "fields"];
    excludefilds.forEach(el => delete queryObj[el]);
    console.log({ query }, { queryObj });
    ////search 
    const filterQuery = searchQuery.find(queryObj)
        .populate('user')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    })
        .populate('admissionSemester');
    let sort = 'createdAt';
    if (query === null || query === void 0 ? void 0 : query.sort) {
        sort = query === null || query === void 0 ? void 0 : query.sort;
    }
    ////// sort 
    const sortQuery = filterQuery.sort(sort);
    let page = 1;
    let limit = 1;
    let skip = 0;
    if (query === null || query === void 0 ? void 0 : query.limit) {
        limit = Number(query === null || query === void 0 ? void 0 : query.limit);
        skip = (page - 1) * limit;
    }
    if (query.page) {
        page = Number(query.page);
    }
    const paginateQuery = sortQuery.skip(skip);
    const limitQuery = paginateQuery.limit(limit);
    ////filds limiting
    let fields = '-__v';
    if (query.fields) {
        fields = query.fields.split(',').join(' ');
        console.log({ fields });
    }
    const fieldsQuery = yield limitQuery.select(fields);
    return fieldsQuery;
});
const getSingleStudentDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findById(id)
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    })
        .populate('admissionSemester');
    return result;
});
const deleteStudentDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        yield session.startTransaction();
        const deleteUser = yield user_model_1.User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deleteUser) {
            throw new Error('fail to deleted student');
        }
        const deleteStudent = yield student_model_1.Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session }).populate('user');
        if (!deleteStudent) {
            throw new Error('fail to deleted student');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deleteStudent;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const updateStudentDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const student = payload.student;
    const result = yield student_model_1.Student.findOneAndUpdate({ id }, student, { new: true });
    return result;
});
exports.StudentService = {
    getAllStudentDB,
    getSingleStudentDB,
    deleteStudentDB,
    updateStudentDB,
};
