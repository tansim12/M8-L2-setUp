import express from "express";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import {  academicFacultyZodValidation } from "./AcademicFaculty.zodValidation ";
import { academicFacultyController } from "./AcademicFaculty.controller";

const router = express.Router();

router.post(
  "/academic-faculty-create",
  validationMiddleWare(academicFacultyZodValidation.AcademicFacultySchemaZod),
  academicFacultyController.createAcademicFaculty
);
router.patch(
  "/:facultyId",
  validationMiddleWare(academicFacultyZodValidation.updateAcademicFacultySchemaZod),
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
