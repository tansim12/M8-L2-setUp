import httpStatus from "http-status";
import QueryBuilder from "../../Builder/QueryBuilder";
import AppError from "../../Error-Handle/AppError";
import SemesterModel from "../Semester/Semester.model";
import { TSemesterRegistration } from "./SemisterRegistration.interface";
import { SemesterRegistrationModel } from "./SemisterRegistration.model";
import { RegistrationStatus } from "./SemisterRegistration.const";
import mongoose from "mongoose";
import { OfferedCourseModel } from "../OfferedCourse/OfferedCourse.model";

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

  const statusUpcomingAndOngoing = await SemesterRegistrationModel.findOne({
    $or: [
      { status: RegistrationStatus.UPCOMING },
      { status: RegistrationStatus.ONGOING },
    ],
  });
  if (statusUpcomingAndOngoing) {
    throw new AppError(
      httpStatus.CONFLICT,
       `There is aready an ${statusUpcomingAndOngoing?.status} registered semester !`
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
  const isExistsSemesterRegistration =
    await SemesterRegistrationModel.findById(id);

  if (!isExistsSemesterRegistration) {
    throw new AppError(httpStatus.NOT_FOUND, "This Semester Not found ");
  }
  const existSemesterRegistrationStatus = isExistsSemesterRegistration?.status;
  const payloadStatus = payload?.status;

  if (existSemesterRegistrationStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This Semester already ${existSemesterRegistrationStatus}`
    );
  }

  // UPCOMING ===> ONGOING ====> ENDED
  // validation 1
  if (
    existSemesterRegistrationStatus === RegistrationStatus.UPCOMING &&
    payloadStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't directly status change by ${existSemesterRegistrationStatus} to ${payloadStatus}`
    );
  }
  // validation 2
  if (
    existSemesterRegistrationStatus === RegistrationStatus.ONGOING &&
    payloadStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't directly status change by ${existSemesterRegistrationStatus} to ${payloadStatus}`
    );
  }

  const result = await SemesterRegistrationModel.findByIdAndUpdate(id, payload);
  if (result) {
    return result;
  } else {
    throw new AppError(400, "Semester Registration something went wrong !");
  }
};

const deleteOfferedCourseAndSemesterRegistrationDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const isExists =
      await SemesterRegistrationModel.findById(id).select("status");
    if (!isExists) {
      throw new AppError(404, "Data Not Found !");
    }

    if (isExists?.status !== RegistrationStatus.UPCOMING) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Semester Registration Current Status is ${isExists?.status}`
      );
    }

    const deleteSemesterRegistration = await SemesterRegistrationModel.findByIdAndDelete(id)
    if (!deleteSemesterRegistration) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Semester Registration Delete Failed !!"
      );
    }

    const existsOfferedCourseThisSemesterRegistrationDelete =
      await OfferedCourseModel.deleteMany({ semesterRegistration: id });
      if (!existsOfferedCourseThisSemesterRegistrationDelete) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Semester Registration Delete Failed !!"
        );
      }
      await session.commitTransaction()
      await session.endSession()
      return existsOfferedCourseThisSemesterRegistrationDelete

  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Semester Registration Delete Failed !!"
    );
  }
};

export const semesterRegistrationService = {
  createSemesterRegistrationDB,
  findAllSemesterRegistrationDB,
  findOneSemesterRegistrationDB,
  updateSemesterRegistrationDB,
  deleteOfferedCourseAndSemesterRegistrationDB,
};
