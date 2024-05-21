import express from "express";
import { studentController } from "./student.controller";

const router = express.Router();

router.post("/create-student", studentController.postStudentData);
router.get("/", studentController.getAllStudent);
router.get("/:studentId", studentController.findOneStudentData);

export const studentRoute = router;
