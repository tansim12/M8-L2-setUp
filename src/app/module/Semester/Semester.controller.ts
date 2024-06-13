import { RequestHandler } from "express";
import {
  errorResponse,
  successResponse,
} from "../../Re-useable/CustomResponse";
import { semesterService } from "./Semester.service";

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const semesterBody = req.body;
    const result = await semesterService.createSemesterDB(semesterBody);
    res
      .status(200)
      .send(successResponse(result, "Semester Create Successfully done"));
  } catch (error) {
    next(error);
  }
};

const getOneSemester: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.semesterId;
    const result: any = await semesterService.getOneSemesterDataDB(id);

    res.status(200).send(successResponse(result, "Find Success"));
  } catch (error) {
    next(error);
  }
};

const updateSemesterData: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.semesterId;
    const updateBody = req.body;

    const result: any = await semesterService.updateSemesterDB(id, updateBody);

    res.status(200).send(successResponse(result, "Update Successfully done"));
  } catch (error) {
    next(error);
  }
};

const findAllSemester: RequestHandler = async (req, res, next) => {
  try {
    const result = await semesterService.findAllDB(req.query);
    return res
      .status(200)
      .send(successResponse(result, "Data Find Successfully done"));
  } catch (error) {
    next(error);
  }
};

export const semesterController = {
  createSemester,
  getOneSemester,
  updateSemesterData,
  findAllSemester,
};
