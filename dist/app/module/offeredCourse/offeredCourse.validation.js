"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseValidation = void 0;
const zod_1 = require("zod");
const offeredCourse_conostant_1 = require("./offeredCourse.conostant");
const offeredCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        semesterRegistration: zod_1.z.string(),
        // academicSemester: z.string(),
        academicFaculty: zod_1.z.string(),
        academicDepartment: zod_1.z.string(),
        course: zod_1.z.string(),
        faculty: zod_1.z.string(),
        maxCapacity: zod_1.z.number(),
        section: zod_1.z.number(),
        days: zod_1.z.array(zod_1.z.enum([...offeredCourse_conostant_1.Days])),
        startTime: zod_1.z.string().refine((time) => {
            const regex = /^(?:[01]\d|2[0-3]):(?:[01]\d|2[0-3])$/;
            return regex.test(time);
        }, { message: "invalid time formate experted 'HH:MM' formate" }),
        endTime: zod_1.z.string().refine((time) => {
            const regex = /^(?:[01]\d|2[0-3]):(?:[01]\d|2[0-3])$/;
            return regex.test(time);
        }, { message: "invalid time formate experted 'HH:MM' formate" }),
    }),
});
exports.OfferedCourseValidation = {
    offeredCourseValidationSchema
};
