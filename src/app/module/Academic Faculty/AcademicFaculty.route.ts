import express from "express";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";

import { academicFacultyController } from "./AcademicFaculty.controller";
import { AcademicZodValidationSchema } from "./AcademicFaculty.zodValidation ";
import { authMiddleWare } from "../../middleware/AuthMiddleWare";

const router = express.Router();


router.patch(
  "/:id",
  validationMiddleWare(AcademicZodValidationSchema.UpdateAcademicFacultySchemaZod),
  academicFacultyController.updateAcademicFaculty
);
router.get(
  "/", authMiddleWare(),
  academicFacultyController.findAllAcademicFaculty
);
router.get(
  "/:id",
  academicFacultyController.findOneAcademicFaculty
);

export const academicFacultyRoute = router;
