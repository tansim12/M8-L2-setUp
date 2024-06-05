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
router.get(
  "/:semesterId",
  semesterController.getOneSemester
);
router.patch(
  "/:semesterId",
  semesterController.updateSemesterData
);

export const academicSemester = router;
