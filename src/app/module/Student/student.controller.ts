import { studentService } from "./student.service";
import { Request, Response } from "express";

const postStudentData = async (req: Request, res: Response) => {
  try {
    const studentBody: any = req.body.student;
    const result: any = await studentService.createStudent(studentBody);

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
    console.log(error);
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
    console.log(error);
  }
};

// get one student data find by id

const findOneStudentData = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.studentId;
    console.log(id);
    const result = await studentService.oneStudent(id);
    res.send({
      success: true,
      message: "data Get one student",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studentController = {
  postStudentData,
  getAllStudent,
  findOneStudentData,
};
