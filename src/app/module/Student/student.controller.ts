import StudentSchemaJoi from "../student.validation";
import { studentService } from "./student.service";
import { Request, Response } from "express";
import StudentSchemaZod from "./student.validation.zod";
import {
  errorResponse,
  successResponse,
} from "../../Re-useable/CustomResponse";

const postStudentData = async (req: Request, res: Response) => {
  try {
    const studentBody: any = req.body.student;

    // joi validation
    // const { error, value } = StudentSchemaJoi.validate(studentBody);
    // const result: any = await studentService.createStudent(value); // value is validate  data by joi
    // if (error) {
    //   res.status(500).send({
    //     success: false,
    //     message: "something went wrong",
    //     err: error,
    //   });
    // }

    // zod validation
    const zodParseStudentBody = StudentSchemaZod.parse(studentBody);
    const result: any = await studentService.createStudent(zodParseStudentBody);

    if (result.status === 202) {
      res.status(202).send(result);
    } else {
      res.status(200).send({
        success: true,
        message: "Student create successfully done",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "something went wrong",
      err: error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentService.allStudents();
    if (result) {
      res
        .status(200)
        .send({ success: true, message: "Data Get Success", data: result });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "something went wrong",
      err: error,
    });
  }
};

// get one student data find by id

const findOneStudentData = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.studentId;

    const result: any = await studentService.oneStudent(id);
    if (result.success === false) {
      return res.status(202).send(errorResponse(result.message));
    }

    res.status(200).send(successResponse(result, "data Get one student"));
  } catch (error) {
    res.status(500).send(errorResponse(error));
  }
};

const deleteOneData = async (req: Request, res: Response) => {
  try {
    const id = req.params.studentId;
    const result:any = await studentService.deleteById(id);
    if (result.success === false) {
      return res.status(202).send(errorResponse(result));
    }

    res.status(200).send(successResponse(result, "student data delete"));
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "something went wrong",
      err: error,
    });
  }
};

export const studentController = {
  postStudentData,
  getAllStudent,
  findOneStudentData,
  deleteOneData,
};
