import { RequestHandler } from "express";
import {
  errorResponse,
  successResponse,
} from "../../Re-useable/CustomResponse";
import { semesterService } from "./Semester.service";
import { ObjectId } from "mongoose";

const createSemester: RequestHandler = async (req, res) => {
  try {
    const semesterBody = req.body;
    const result = await semesterService.createSemesterDB(semesterBody);
    res
      .status(200)
      .send(successResponse(result, "Semester Create Successfully done"));
  } catch (error) {
    res.status(500).send(errorResponse(error));
  }
};

const getOneSemester: RequestHandler = async (req, res) => {
  try {
    const id = req.params.semesterId;
    const result: any = await semesterService.getOneSemesterDataDB(id);
    if (result?.success === false) {
      return res.status(202).send(errorResponse(result));
    }
    res.status(200).send(successResponse(result, "Find Success"));
  } catch (error) {
    res.status(500).send(errorResponse(error));
  }
};

const updateSemesterData: RequestHandler = async (req, res) => {
  try {
    const id = req.params.semesterId;
    const updateBody = req.body;

    const result: any = await semesterService.updateSemesterDB(id, updateBody);
    if (result?.success === false) {
      return res.status(202).send(errorResponse(result));
    }
    res.status(200).send(successResponse(result, "Update Successfully done"));
  } catch (error) {
    res.status(500).send(errorResponse(error));
  }
};

export const semesterController = {
  createSemester,
  getOneSemester,updateSemesterData
};
