import StudentSchemaJoi from "./student.validation";
import { studentService } from "./student.service";
import { NextFunction, Request, RequestHandler, Response } from "express";

import {
  errorResponse,
  successResponse,
} from "../../Re-useable/CustomResponse";

const getAllStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await studentService.allStudents();
    if (result) {
      res
        .status(200)
        .send({ success: true, message: "Data Get Success", data: result });
    }
  } catch (error) {
    next(error)
  }
};

// get one student data find by id

const findOneStudentData = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const id: string = req.params.studentId;

    const result = await studentService.oneStudent(id);
    return res
      .status(200)
      .send(successResponse(result, "data Get one student"));
  } catch (error) {
    next(error)
  }
};

const deleteOneData = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const id = req.params.studentId;
    const result: any = await studentService.deleteById(id);
    if (result.success === false) {
      return res.status(404).send(errorResponse(result));
    }

    res.status(200).send(successResponse(result, "student data delete"));
  } catch (error) {
    next(error)
  }
};

const updateStudentData: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.studentId;
    const studentData = req.body;
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
  deleteOneData,updateStudentData
};
