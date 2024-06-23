import { z } from 'zod';

const createFacultyValidationSchemaZod = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: ' faculty must be string',
    }),
  }),
});

const updateFacultyValidationSchemaZod = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: ' faculty must be string',
    }),
  }),
});

export const FacultyZodValidation = {
    createFacultyValidationSchemaZod,
    updateFacultyValidationSchemaZod,
};