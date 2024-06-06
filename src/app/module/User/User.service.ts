import { TUser } from "./User.interface";
import UserModel from "./User.model";
import StudentModel from "../Student/Student.modal";
import { Student } from "../Student/Student.interface";
import SemesterModel from "../Semester/Semester.model";
import { generateId } from "./User.utils";

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

    if (findSemester) {
      // call generateId 
      userData.id = await generateId(findSemester) ;
      userData.role = "student";
      
    }


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
