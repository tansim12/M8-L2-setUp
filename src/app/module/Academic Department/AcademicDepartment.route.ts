import express from "express";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import { academicDepartmentController } from "./AcademicDepartment.controller";
import { academicDepartmentZodValidation } from "./AcademicDepartment.zodValidation";

const router = express.Router();

router.post(
  "/academic-department-create",
  validationMiddleWare(
    academicDepartmentZodValidation.AcademicDepartmentSchemaZod
  ),
  academicDepartmentController.createAcademicFaculty
);
router.patch(
  "/:departmentId",
  validationMiddleWare(
    academicDepartmentZodValidation.updateAcademicDepartmentSchemaZod
  ),
  academicDepartmentController.updateAcademicFaculty
);
router.get("/", academicDepartmentController.findAllAcademicFaculty);
router.get("/:departmentId", academicDepartmentController.findOneAcademicFaculty);

export const academicDepartmentRoute = router;
