import express from "express";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import { academicZodValidation } from "./AcademicFaculty.zodValidation ";
import { academicFacultyController } from "./AcademicFaculty.controller";

const router = express.Router();

router.post(
  "/academic-faculty-create",
  validationMiddleWare(academicZodValidation.AcademicFacultySchemaZod),
  academicFacultyController.createAcademicFaculty
);
router.patch(
  "/:facultyId",
  validationMiddleWare(academicZodValidation.updateAcademicFacultySchemaZod),
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
