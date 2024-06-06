import { z } from "zod";
import {
  semesterCodeArray,
  semesterMonthArray,
  semesterNameArray,
} from "./Semester.constVariable";

// Zod schema for TMonth
const MonthSchemaZod = z
  .enum([...semesterMonthArray] as [string, ...string[]])
  .optional();

// Zod schema for TSemester
const SemesterSchemaZod = z.object({
  body: z.object({
    name: z.enum([...semesterNameArray] as [string, ...string[]], {
      required_error: "Semester name is required.",
      invalid_type_error:
        "Semester name must be one of 'Autumn', 'Summer', or 'Fall'.",
    }),
    code: z.enum([...semesterCodeArray] as [string, ...string[]], {
      required_error: "Semester code is required.",
      invalid_type_error: "Semester code must be one of '01', '02', or '03'.",
    }),
    year: z.string({
      required_error: "Year is required.",
      invalid_type_error: "Year must be a valid date.",
    }),
    startMonth: MonthSchemaZod,
    endMonth: MonthSchemaZod,
  }),
});
const UpdateSemesterSchemaZod = z.object({
  body: z.object({
    name: z
      .enum([...semesterNameArray] as [string, ...string[]], {
        required_error: "Semester name is required.",
        invalid_type_error:
          "Semester name must be one of 'Autumn', 'Summer', or 'Fall'.",
      })
      .optional(),
    code: z
      .enum([...semesterCodeArray] as [string, ...string[]], {
        required_error: "Semester code is required.",
        invalid_type_error: "Semester code must be one of '01', '02', or '03'.",
      })
      .optional(),
    year: z
      .string({
        required_error: "Year is required.",
        invalid_type_error: "Year must be a valid date.",
      })
      .optional(),
    startMonth: MonthSchemaZod,
    endMonth: MonthSchemaZod,
  }),
});

export const semesterZodValidation = {
  SemesterSchemaZod,
  UpdateSemesterSchemaZod,
};
