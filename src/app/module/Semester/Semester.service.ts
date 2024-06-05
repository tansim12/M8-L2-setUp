import StudentModel from "../Student/Student.modal";
import { TSemester } from "./Semester.interface";
import SemesterModel from "./Semester.model";

const createSemesterDB = async (semesterBody: TSemester) => {

  const semesterData = await SemesterModel.create(semesterBody);
  semesterData;

  // const semesterId = semesterData._id
  // if (Object.keys(semesterData).length) {

  //  const x = await StudentModel.updateOne()
  // }
};

export const semesterService = {
  createSemesterDB,
};
