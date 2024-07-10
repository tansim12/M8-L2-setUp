import express from "express";
import { semesterController } from "./Semester.controller";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import { semesterZodValidation } from "./Semester.zodValidation";
import { authMiddleWare } from "../../middleware/AuthMiddleWare";
import { USER_ROLE } from "../User/User.const";

const router = express.Router();

router.post(
  "/create-academic-semester",
  authMiddleWare(USER_ROLE.admin),
  validationMiddleWare(semesterZodValidation.SemesterSchemaZod),
  semesterController.createSemester
);
router.get(
  "/",
  authMiddleWare(USER_ROLE.admin),

  semesterController.findAllSemester
);
router.get(
  "/:semesterId",
  authMiddleWare(USER_ROLE.admin),
  semesterController.getOneSemester
);
router.patch(
  "/:semesterId",
  authMiddleWare(USER_ROLE.admin),
  validationMiddleWare(semesterZodValidation.UpdateSemesterSchemaZod),
  semesterController.updateSemesterData
);

export const academicSemester = router;
