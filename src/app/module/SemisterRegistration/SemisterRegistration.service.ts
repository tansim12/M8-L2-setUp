import QueryBuilder from "../../Builder/QueryBuilder";
import AppError from "../../Error-Handle/AppError";
import SemesterModel from "../Semester/Semester.model";
import { TSemesterRegistration } from "./SemisterRegistration.interface";
import { SemesterRegistrationModel } from "./SemisterRegistration.model";

const createSemesterRegistrationDB = async (
  payload: Partial<TSemesterRegistration>
) => {
  const result = await SemesterRegistrationModel.create(payload);
  if (result) {
    return result;
  } else {
    throw new AppError(400, "Semester Registration Failed !");
  }
};

const findAllSemesterRegistrationDB = async (
  queryParams: Partial<TSemesterRegistration>
) => {
  const querySemesterRegistration = new QueryBuilder(
    SemesterRegistrationModel.find(),
    queryParams
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await querySemesterRegistration.modelQuery;
  if (result.length) {
    return result;
  } else {
    throw new AppError(400, "Semester Registration Failed !");
  }
};

const findOneSemesterRegistrationDB = async (id:string) => {
  const result = await SemesterModel.findById(id);
  if (result) {
    return result;
  } else {
    result;
  }
};

export const semesterRegistrationService = {
  createSemesterRegistrationDB,
  findAllSemesterRegistrationDB,
  findOneSemesterRegistrationDB,
};
