import { ObjectId } from "mongoose";
import StudentModel from "../Student/Student.modal";
import { TSemester } from "./Semester.interface";
import SemesterModel from "./Semester.model";

const createSemesterDB = async (semesterBody: TSemester) => {
  const semesterData = await SemesterModel.create(semesterBody);
  return semesterData;

  // const semesterId = semesterData._id
  // if (Object.keys(semesterData).length) {

  //  const x = await StudentModel.updateOne()
  // }
};

const getOneSemesterDataDB = async (id: string) => {
  const result = await SemesterModel.findById({ _id: id });
  if (!result) {
    return {
      success: false,
      message: "Not found Data",
    };
  } else {
    return result;
  }
};

const updateSemesterDB = async (id: string, payload: TSemester) => {
    
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
    return {
      success: false,
      message: "Not found Data",
    };
  }
};

export const semesterService = {
  createSemesterDB,
  getOneSemesterDataDB,
  updateSemesterDB,
};
