import { z } from 'zod';
import { Days } from './offeredCourse.conostant';

const offeredCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    // academicSemester: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: z.string().refine((time) => {
      const regex = /^(?:[01]\d|2[0-3]):(?:[01]\d|2[0-3])$/
      return regex.test(time)
    }, {message: "invalid time formate experted 'HH:MM' formate" }),
    endTime: z.string().refine((time) => {
      const regex = /^(?:[01]\d|2[0-3]):(?:[01]\d|2[0-3])$/
      return regex.test(time)
    }, {message: "invalid time formate experted 'HH:MM' formate" }),
  }),
});

export const OfferedCourseValidation = {
    offeredCourseValidationSchema
} 