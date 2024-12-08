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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const course_constant_1 = require("./course.constant");
const course_model_1 = require("./course.model");
const createCourseDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = course_model_1.Course.create(payload);
    return result;
});
const getAllCoursesDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.Course.find().populate('prePerquisiteCourses.course'), query)
        .search(course_constant_1.CourchSearchAbleFilds)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield courseQuery.modelQuery;
    return result;
});
const getSingleCoursesDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = course_model_1.Course.findById(id).populate('prePerquisiteCourses.course');
    return result;
});
const deletedCoursesDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = course_model_1.Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const updateCourseDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { prePerquisiteCourses } = payload, courseRemainingData = __rest(payload, ["prePerquisiteCourses"]);
    const session = yield mongoose_1.default.startSession();
    try {
        yield session.startTransaction();
        const updatedBesicCourseInfo = yield course_model_1.Course.findByIdAndUpdate(id, courseRemainingData, { new: true, runValidators: true, session });
        if (!updatedBesicCourseInfo) {
            throw new Error('fail to update course');
        }
        ////checktheare is any pre requs course update
        if (prePerquisiteCourses && prePerquisiteCourses.length > 0) {
            const deletedPreRequisite = prePerquisiteCourses
                .filter((el) => el.course && el.isDeleted)
                .map((el) => el.course);
            console.log(deletedPreRequisite);
            const deletedPreRequisiteCourse = yield course_model_1.Course.findByIdAndUpdate(id, {
                $pull: {
                    prePerquisiteCourses: { course: { $in: deletedPreRequisite } },
                },
            }, { new: true, runValidators: true, session });
            if (!deletedPreRequisiteCourse) {
                throw new Error('fail to deleted course');
            }
            //// filter out the new corse fild
            const newPreRequisite = prePerquisiteCourses === null || prePerquisiteCourses === void 0 ? void 0 : prePerquisiteCourses.filter((el) => el.course && !el.isDeleted);
            const newPreRequisiteCourese = yield course_model_1.Course.findByIdAndUpdate(id, {
                $addToSet: { prePerquisiteCourses: { $each: newPreRequisite } },
            }, { new: true, runValidators: true, session });
            if (!newPreRequisiteCourese) {
                throw new Error('fail to Add course');
            }
        }
        const result = yield course_model_1.Course.findById(id).populate('prePerquisiteCourses.course');
        yield session.commitTransaction();
        yield session.endSession();
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const assignFacultiesWithCourseDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, {
        courseId: id,
        $addToSet: { faculties: { $each: payload } },
    }, {
        upsert: true,
        new: true,
    });
    return result;
});
/////////////////
const removeFacultiesFromCourseDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, {
        $pull: { faculties: { $in: payload } }
    }, {
        new: true,
    });
    return result;
});
exports.CourseServices = {
    createCourseDB,
    getAllCoursesDB,
    getSingleCoursesDB,
    deletedCoursesDB,
    updateCourseDB,
    assignFacultiesWithCourseDB,
    removeFacultiesFromCourseDB
};
