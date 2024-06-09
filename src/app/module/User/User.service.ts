import { TUser } from "./User.interface";
import UserModel from "./User.model";
import StudentModel from "../Student/Student.modal";
import { Student } from "../Student/Student.interface";
import SemesterModel from "../Semester/Semester.model";
import { generateId } from "./User.utils";
import mongoose from "mongoose";
import AppError from "../../Error-Handle/AppError";
import httpStatus from "http-status";

const userPostDataDB = async (studentData: Student, password: string) => {
  const isExist = await StudentModel.findOne({ email: studentData.email });
  if (isExist) {
    return {
      success: false,
      message: "user already exist",
    };
  } else {
    let userData: Partial<TUser> = {};
    userData.password = password || "565896322";

    // generate semester id by year code 4 digit number
    const findSemester = await SemesterModel.findById({
      _id: studentData?.admissionSemester,
    });

    //  crate a acid operation   Transaction and Rollback
    // creating session
    const session = await mongoose.startSession(); // step 1 creating session

    try {
      session.startTransaction(); // step 2 start Transaction session
      if (findSemester) {
        // call generateId
        userData.id = await generateId(findSemester);
        userData.role = "student";
      }

      // create a user   operation write -1
      const userResult = await UserModel.create([userData], { session });

      if (userResult.length) {
        studentData.id = userResult[0].id;
        studentData.user = userResult[0]._id;
        // create a student operation write -2
        const studentResult = await StudentModel.create([studentData], {
          session,
        });

        if (!studentResult.length) {
          throw new AppError(httpStatus.BAD_REQUEST, "Student not creating");
        }
        await session.commitTransaction(); // step 3 when  creating user and student then  session commitTransaction save
        await session.endSession();   // step 4 endSession
        return studentResult;
      } else {
        throw new AppError(httpStatus.BAD_REQUEST, "user not creating");
      }
    } catch (error) {
      await session.abortTransaction(); // step 5  when error then  abortTransaction 
      await session.endSession();  // step 6 endSession
      throw new AppError(httpStatus.FAILED_DEPENDENCY, "failed to crate student")
    }
  }
};

export const userService = {
  userPostDataDB,
};
