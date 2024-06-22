import { RequestHandler } from "express";
import { semesterRegistrationService } from "./SemisterRegistration.service";
import { successResponse } from "../../Re-useable/CustomResponse";

const createSemesterRegistration: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body;
    const result =
      await semesterRegistrationService.createSemesterRegistrationDB(payload);
    res
      .status(200)
      .send(successResponse(result, "Semester Registration Successfully done"));
  } catch (error) {
    next(error);
  }
};
const findAllSemesterRegistration: RequestHandler = async (req, res, next) => {
  try {
    const queryParams = req.query;
    const result =
      await semesterRegistrationService.findAllSemesterRegistrationDB(
        queryParams
      );
    res
      .status(200)
      .send(
        successResponse(
          result,
          "All Semester Registration Find Successfully done"
        )
      );
  } catch (error) {
    next(error);
  }
};
const findOneSemesterRegistration: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result =
      await semesterRegistrationService.findOneSemesterRegistrationDB(id);
    res
      .status(200)
      .send(
        successResponse(
          result,
          "One Semester Registration Find Successfully done"
        )
      );
  } catch (error) {
    next(error);
  }
};

export const semesterRegistrationController = {
  createSemesterRegistration,
  findAllSemesterRegistration,
  findOneSemesterRegistration,
};
