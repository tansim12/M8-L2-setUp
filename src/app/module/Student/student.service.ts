import mongoose from "mongoose";
import StudentModel from "./Student.modal";
import UserModel from "../User/User.model";
import AppError from "../../Error-Handle/AppError";
import httpStatus from "http-status";
const allStudents = async () => {
  const result = await StudentModel.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

// get one student
const oneStudent = async (id: string) => {
  // const result = await StudentModel.findOne({ id: id });
  const result = await StudentModel.findById(id)
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
    return {
      success: false,
      message: "No find Data",
    };
  }
};

const deleteById = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    await session.startTransaction()

    const studentDeleteResult = await StudentModel.findOneAndUpdate({ id }, { isDelete: true }, {new:true, session});
console.log(studentDeleteResult);

    if (studentDeleteResult) {
      const deleteUserResult = await UserModel.findOneAndUpdate({id}, {isDeleted:true}, {new:true , session})
      if (!deleteUserResult) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Deleted Failed")
      }
      await session.commitTransaction()
      await session.endSession()
      
      return studentDeleteResult;
    } else {
 
      throw new AppError(httpStatus.BAD_REQUEST, "Student Deleted Failed")
    }
  } catch (error) {
    await session.abortTransaction()
      await session.endSession()
  }
  
};

export const studentService = {
  allStudents,
  oneStudent,
  deleteById,
};
