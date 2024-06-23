import httpStatus from "http-status";
import QueryBuilder from "../../Builder/QueryBuilder";
import AppError from "../../Error-Handle/AppError";
import SemesterModel from "../Semester/Semester.model";
import { TSemesterRegistration } from "./SemisterRegistration.interface";
import { SemesterRegistrationModel } from "./SemisterRegistration.model";

const createSemesterRegistrationDB = async (
  payload: Partial<TSemesterRegistration>
) => {
  // existsAcademicSemester validation
  const existsAcademicSemester = await SemesterModel.findById(
    payload?.academicSemester
  );
  if (!existsAcademicSemester) {
    throw new AppError(404, "Academic Semester dose not exist !");
  }
  // isSemesterRegistrationExists validation
  const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({
    academicSemester: payload.academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This Semester Already Registered .."
    );
  }

  const latestStatusSemesterRegistration =
    await SemesterRegistrationModel.findOne().sort({ createdAt: -1 });
  if (
    latestStatusSemesterRegistration?.status === "UPCOMING" ||
    latestStatusSemesterRegistration?.status === ("ONGOING" as string)
  ) {
    console.log({ 35656565856: latestStatusSemesterRegistration?.status });

    throw new AppError(
      httpStatus.CONFLICT,
      `Last Semester Is ${latestStatusSemesterRegistration?.status}`
    );
  }

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
    SemesterRegistrationModel.find().populate("academicSemester"),
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

const findOneSemesterRegistrationDB = async (id: string) => {
  const result =
    await SemesterRegistrationModel.findById(id).populate("academicSemester");
  if (result) {
    return result;
  } else {
    throw new AppError(400, "Find One Semester Registration Failed !");
  }
};
const updateSemesterRegistrationDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  console.log({ id }, { payload });
};

export const semesterRegistrationService = {
  createSemesterRegistrationDB,
  findAllSemesterRegistrationDB,
  findOneSemesterRegistrationDB,
  updateSemesterRegistrationDB,
};
