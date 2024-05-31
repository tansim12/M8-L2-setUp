import express from "express";
import { studentController } from "./student.controller";

const router = express.Router();

router.post("/create-student", studentController.postStudentData);
router.get("/", studentController.getAllStudent);
router.get("/:studentId", studentController.findOneStudentData);
router.delete("/:studentId", studentController.deleteOneData);

export const studentRoute = router;
