import express from "express";
import { semesterController } from "./Semester.controller";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import SemesterSchemaZod from "./Semester.zodValidation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validationMiddleWare(SemesterSchemaZod),
  semesterController.createSemester
);

export const academicSemester = router;
