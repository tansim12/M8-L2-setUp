import express from "express";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import { FacultyZodValidation } from "./Faculty.zodValidation";
import { FacultyControllers } from "./Faculty.controller";

const router = express.Router();

router.post(
  "/create-faculty",
  validationMiddleWare(FacultyZodValidation.createFacultyValidationSchemaZod),
  FacultyControllers.createFaculty
);

router.get("/:id", FacultyControllers.getSingleFaculty);

router.patch(
  "/:id",
  validationMiddleWare(FacultyZodValidation.updateFacultyValidationSchemaZod),
  FacultyControllers.updateFaculty
);

router.get("/", FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
