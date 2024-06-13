import { TSemester } from "./Semester.interface";
import SemesterModel from "./Semester.model";
import AppError from "../../Error-Handle/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../Builder/QueryBuilder";
import { semesterSearchableFields } from "./Semester.constVariable";

interface TNameAndCode {
  Autumn: "01";
  Summer: "02";
  Fall: "03";
}

const nameWiseCode: TNameAndCode = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};

const createSemesterDB = async (semesterBody: TSemester) => {
  const isCheck = nameWiseCode[semesterBody.name] !== semesterBody.code;
  if (isCheck) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid code and name");
  }

  const semesterData = await SemesterModel.create(semesterBody);
  return semesterData;
};

const getOneSemesterDataDB = async (id: string) => {
  const result = await SemesterModel.findById({ _id: id });
  if (!result) {
    throw new AppError(404, "Data Not Found");
  } else {
    return result;
  }
};

const updateSemesterDB = async (id: string, payload: TSemester) => {
  if (payload?.name && payload.code) {
    const isCheck = nameWiseCode[payload.name] !== payload.code;
    if (isCheck) {
      throw new AppError(404, "Invalid code and name");
    }
  }

  const result = await SemesterModel.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        ...payload,
      },
    },
    { new: true }
  );

  if (result) {
    return result;
  } else {
    throw new AppError(404, "Data Not Found");
  }
};

const findAllDB = async (queryParams:Partial<TSemester>) => {
  const semesterQuery = new QueryBuilder(SemesterModel.find(),queryParams).search(semesterSearchableFields).filter().sort().paginate().fields()
  const result = await semesterQuery.modelQuery;
  if (result.length) {
    return result;
  } else {
    throw new AppError(404, "Data Not Found");
  }
};

export const semesterService = {
  createSemesterDB,
  getOneSemesterDataDB,
  updateSemesterDB,findAllDB
};
