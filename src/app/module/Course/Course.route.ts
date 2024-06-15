import express from "express";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import { CourseZodValidations } from "./Course.zodValidation";
import { courseController } from "./Course.controller";

const router = express.Router();

router.post(
  "/create-course",
  validationMiddleWare(CourseZodValidations.createCourseValidationSchemaZod),
  courseController.createCourse
);
router.patch(
  "/:id",
  validationMiddleWare(CourseZodValidations.updateCourseValidationSchemaZod),
  courseController.updateCourse
);
router.get("/", courseController.findAllCourse);
router.get("/:id", courseController.findOneCourse);

export const courseRoute = router;
