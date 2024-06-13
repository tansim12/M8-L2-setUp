import express from "express";
import { userController } from "./User.controller";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import { studentSchemaZod } from "../Student/student.validation.zod";
import { AcademicZodValidationSchema } from "../Academic Faculty/AcademicFaculty.zodValidation ";

const router = express.Router();

router.post(
  "/create-student",
  validationMiddleWare(studentSchemaZod.CreateStudentSchemaZod),
  userController.createStudent
);

router.post(
  "/academic-faculty-create",
  validationMiddleWare(
    AcademicZodValidationSchema.CreateAcademicFacultySchemaZod
  ),
  userController.createFaculty
);

export const userRoute = router;
