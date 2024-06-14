import StudentSchemaJoi from "./student.validation";
import { studentService } from "./student.service";
import { NextFunction, Request, RequestHandler, Response } from "express";

import {
  errorResponse,
  successResponse,
} from "../../Re-useable/CustomResponse";

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const result = await studentService.allStudents(req.query);
    if (result) {
      res.status(200).send(successResponse(result, "Data Get Success"));
    }
  } catch (error) {
    next(error);
  }
};

// get one student data find by id

const findOneStudentData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: string = req.params.id;

    const result = await studentService.oneStudent(id);
    return res
      .status(200)
      .send(successResponse(result, "data Get one student"));
  } catch (error) {
    next(error);
  }
};

const deleteOneData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result: any = await studentService.deleteById(id);

    res.status(200).send(successResponse(result, "student data delete"));
  } catch (error) {
    next(error);
  }
};

const updateStudentData: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.studentId;
    const studentData = req.body.student;
    const result = await studentService.updateStudentDB(id, studentData);
    return res
      .status(200)
      .send(successResponse(result, "Student data update successfully done "));
  } catch (error) {
    next(error);
  }
};

export const studentController = {
  getAllStudent,
  findOneStudentData,
  deleteOneData,
  updateStudentData,
};
