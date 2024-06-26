import { TUser } from "./User.interface";
import UserModel from "./User.model";
import StudentModel from "../Student/Student.modal";
import { Student } from "../Student/Student.interface";
import SemesterModel from "../Semester/Semester.model";
import { generateDynamicId, generateId } from "./User.utils";
import mongoose from "mongoose";
import AppError from "../../Error-Handle/AppError";
import httpStatus from "http-status";
import { TAcademicFaculty } from "../Academic Faculty/AcademicFaculty.interface";
import AcademicFacultyModel from "../Academic Faculty/AcademicFaculty.model";
import { AdminModel2 } from "../Admin/Admin.model";

const createStudentDB = async (studentData: Student, password: string) => {
  const isExist = await StudentModel.findOne({ email: studentData.email });
  if (isExist) {
    throw new AppError(400, '"user already exist"');
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
        await session.endSession(); // step 4 endSession
        return studentResult;
      } else {
        throw new AppError(httpStatus.BAD_REQUEST, "user not creating");
      }
    } catch (error) {
      await session.abortTransaction(); // step 5  when error then  abortTransaction
      await session.endSession(); // step 6 endSession
      throw new AppError(
        httpStatus.FAILED_DEPENDENCY,
        "failed to crate student"
      );
    }
  }
};

const createAcademicFacultyDB = async (
  payload: Partial<TAcademicFaculty>,
  password: string
) => {
  const type: string = "faculty";
  const session = await mongoose.startSession();
  let userData: Partial<TUser> = {};
  userData.password = password || "565896322";
  userData.id = await generateDynamicId(type);
  userData.role = "faculty";

  try {
    session.startTransaction();
    const userResult = await UserModel.create([userData], { session });
    if (userResult.length) {
      payload.id = userResult[0]?.id;
      payload.user = userResult[0]?._id;

      const facultyResult = await AcademicFacultyModel.create([payload], {
        session,
      });

      if (!facultyResult.length) {
        throw new AppError(httpStatus.BAD_REQUEST, "Faulty Create Failed");
      }
      await session.commitTransaction();
      await session.endSession();
      return facultyResult;
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, "User Create Failed");
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Faculty Create Failed2");
  }
};

const createAdminDB = async (
  payload: Partial<TAcademicFaculty>,
  password: string
) => {
  const type: string = "admin";
  const session = await mongoose.startSession();
  let userData: Partial<TUser> = {};
  userData.password = password || "admin12";
  userData.id = await generateDynamicId(type);
  userData.role = "admin";

  try {
    session.startTransaction();
    const userResult = await UserModel.create([userData], { session });
    if (userResult.length) {
      payload.id = userResult[0]?.id;
      payload.user = userResult[0]?._id;

      const adminResult = await AdminModel2.create([payload], { session });

      if (!adminResult.length) {
        throw new AppError(httpStatus.BAD_REQUEST, "Admin Create Failed");
      }
      await session.commitTransaction();
      await session.endSession();
      return adminResult;
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, "User Create Failed");
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Admin Create Failed2");
  }
};
export const userService = {
  createStudentDB,
  createAcademicFacultyDB,
  createAdminDB,
};
