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
  academicDepartmentController.createAcademicDepartment
);
router.patch(
  "/:departmentId",
  validationMiddleWare(
    academicDepartmentZodValidation.updateAcademicDepartmentSchemaZod
  ),
  academicDepartmentController.updateAcademicDepartment
);
router.get("/", academicDepartmentController.findAllAcademicDepartment);
router.get("/:departmentId", academicDepartmentController.findOneAcademicDepartment);

export const academicDepartmentRoute = router;
