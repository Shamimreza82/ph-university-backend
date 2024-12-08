"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidationSchema = void 0;
const zod_1 = require("zod");
const preRequisiteCourseValidationSchema = zod_1.z.object({
    course: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().optional(),
});
const createCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        prefix: zod_1.z.string(),
        code: zod_1.z.number(),
        credits: zod_1.z.number(),
        isDeleted: zod_1.z.boolean().optional(),
        prePerquisiteCourses: zod_1.z
            .array(preRequisiteCourseValidationSchema)
            .optional(),
    }),
});
const updatePreRequisiteCourseValidationSchema = zod_1.z.object({
    course: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().optional(),
});
const updateCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        prefix: zod_1.z.string().optional(),
        code: zod_1.z.number().optional(),
        credits: zod_1.z.number().optional(),
        isDeleted: zod_1.z.boolean().optional(),
        prePerquisiteCourses: zod_1.z
            .array(updatePreRequisiteCourseValidationSchema)
            .optional(),
    }),
});
const facultiesWithCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        course: zod_1.z.string().optional(),
        faculties: zod_1.z.array(zod_1.z.string()),
    }),
});
exports.CourseValidationSchema = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
    facultiesWithCourseValidationSchema,
};
