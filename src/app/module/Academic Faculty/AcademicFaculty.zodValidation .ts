import { z } from "zod";

// Define the Zod schema for TAcademicFaculty
const AcademicFacultySchemaZod = z.object({
 body:z.object({
    name: z.string().nonempty({ message: "Faculty name is required" }),
 })
});

// Define the Zod schema for TAcademicFaculty
const updateAcademicFacultySchemaZod = z.object({
 body:z.object({
    name: z.string().nonempty({ message: "Faculty name is required" }),
 })
});


export const academicZodValidation = {
    AcademicFacultySchemaZod,updateAcademicFacultySchemaZod
}