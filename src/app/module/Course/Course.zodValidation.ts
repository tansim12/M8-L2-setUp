import { z } from 'zod';

const PreRequisiteCourseValidationSchemaZod = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchemaZod = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(PreRequisiteCourseValidationSchemaZod).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updatePreRequisiteCourseValidationSchemaZod = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchemaZod = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(updatePreRequisiteCourseValidationSchemaZod)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const facultiesWithCourseValidationSchemaZod = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const CourseZodValidations = {
    createCourseValidationSchemaZod,
    updateCourseValidationSchemaZod,
  facultiesWithCourseValidationSchemaZod,
};