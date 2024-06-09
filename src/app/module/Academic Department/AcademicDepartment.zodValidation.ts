import { z } from "zod";

// Define the Zod schema for TAcademicFaculty
const AcademicDepartmentSchemaZod = z.object({
  body: z.object({
    name: z.string().nonempty({ message: "Department name is required" }),
    academicFaculty: z
      .string()
      .nonempty({ message: "Academic faculty id is required" }),
  }),
});

// Define the Zod schema for TAcademicFaculty
const updateAcademicDepartmentSchemaZod = z.object({
  body: z.object({
    name: z
      .string()
      .nonempty({ message: "Department name is required" })
      .optional(),
    academicFaculty: z
      .string()
      .nonempty({ message: "Academic faculty id is required" })
      .optional(),
  }),
});

export const academicDepartmentZodValidation = {
 AcademicDepartmentSchemaZod,
  updateAcademicDepartmentSchemaZod,
};
