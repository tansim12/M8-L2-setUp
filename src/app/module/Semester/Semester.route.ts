import express from "express";
import { semesterController } from "./Semester.controller";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import  { semesterZodValidation } from "./Semester.zodValidation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validationMiddleWare(semesterZodValidation.SemesterSchemaZod),
  semesterController.createSemester
);
router.get(
  "/:semesterId",
  semesterController.getOneSemester
);
router.patch(
  "/:semesterId",validationMiddleWare(semesterZodValidation.UpdateSemesterSchemaZod),
  semesterController.updateSemesterData
);

export const academicSemester = router;
