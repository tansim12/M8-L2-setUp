import { ObjectId } from "mongoose";
import StudentModel from "../Student/Student.modal";
import { TSemester } from "./Semester.interface";
import SemesterModel from "./Semester.model";

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
    throw new Error("Invalid code and name");
  }

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
  if (payload?.name && payload.code) {
    const isCheck = nameWiseCode[payload.name] !== payload.code;
    if (isCheck) {
      throw new Error("Invalid code and name");
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
