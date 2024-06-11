import mongoose from "mongoose";
import StudentModel from "./Student.modal";
import UserModel from "../User/User.model";
import AppError from "../../Error-Handle/AppError";
import httpStatus from "http-status";
import { Student } from "./Student.interface";
const allStudents = async (queryParams: Record<string, unknown>) => {
  const queryObj = { ...queryParams };
  
  
  // should be query
  // {"name.firstName":{$regex:queryParams?.searchTerm, $options:"1"}}
  // {email:{$regex:queryParams?.searchTerm, $options:"i"}}

  const searchAbleFields = ["name.firstName", "email"];
  const excludeFields = ["searchTerm", ];

 let searchTerm = "";
  if (queryParams && typeof queryParams.searchTerm === 'string') {
    searchTerm = queryParams.searchTerm;
  }

  excludeFields.forEach((el) => delete queryObj[el]);


  const searchQuery = StudentModel.find({
    $or: searchAbleFields.map((item) => ({
      [item]: { $regex: searchTerm, $options: "i" },
    })),
  });
console.log({queryObj, queryParams});

  const result = await searchQuery
    .find(queryObj)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  if (result.length) {
    return result;
  } else {
    throw new AppError(404, "Data Not found");
  }
};

// get one student
const oneStudent = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  if (result) {
    return result;
  } else {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
  }
};

const deleteById = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const studentDeleteResult = await StudentModel.findOneAndUpdate(
      { id },
      { isDelete: true },
      { new: true, session }
    );

    if (studentDeleteResult) {
      const deleteUserResult = await UserModel.findOneAndUpdate(
        { id },
        { isDeleted: true },
        { new: true, session }
      );
      if (!deleteUserResult) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Deleted Failed");
      }
      await session.commitTransaction();
      await session.endSession();

      return studentDeleteResult;
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, "Student Deleted Failed");
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.FAILED_DEPENDENCY,
      "failed to Delete student"
    );
  }
};

const updateStudentDB = async (id: string, payload: Partial<Student>) => {
  const { guardian, address, name, ...remainingStudentData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  if (address && Object.keys(address).length) {
    for (const [key, value] of Object.entries(address)) {
      modifiedUpdateData[`address.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdateData
  );
  if (result) {
    return result;
  } else {
    throw new AppError(httpStatus.NOT_FOUND, "Data Not found");
  }
};

export const studentService = {
  allStudents,
  oneStudent,
  deleteById,
  updateStudentDB,
};
