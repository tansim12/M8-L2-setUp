import express from "express";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";

import { academicFacultyController } from "./AcademicFaculty.controller";
import { AcademicZodValidationSchema } from "./AcademicFaculty.zodValidation ";

const router = express.Router();


router.patch(
  "/:facultyId",
  validationMiddleWare(AcademicZodValidationSchema.UpdateAcademicFacultySchemaZod),
  academicFacultyController.updateAcademicFaculty
);
router.get(
  "/",
  academicFacultyController.findAllAcademicFaculty
);
router.get(
  "/:facultyId",
  academicFacultyController.findOneAcademicFaculty
);

export const academicFacultyRoute = router;
