
import { TUser } from "./User.interface";
import UserModel from "./User.model";
import StudentModel from "../Student/Student.modal";
import { Student } from "../Student/Student.interface";

const userPostDataDB = async (studentData: Student, password: string) => {
  const isExist = await StudentModel.findOne({ email: studentData.email });
  if (isExist) {
    return {
      success: false,
      message: "user already exist",
    };
  } else {
    let userData: Partial<TUser> = {};
    const studentId = "203010006";
    userData.password = password || "565896322";
    userData.id = studentId;
    userData.role = "student";

    // create a user
    const userResult = await UserModel.create(userData);
    // create a student
    if (Object.keys(userResult).length) {
      studentData.id = userResult.id;
      studentData.user = userResult._id;
      const studentResult = await StudentModel.create(studentData);
      return studentResult;
    }
  }
};

export const userService = {
  userPostDataDB,
};
