import StudentModel from "../Student/Student.modal";
import { TSemester } from "./Semester.interface";
import SemesterModel from "./Semester.model";


const createSemesterDB = async(semesterBody:TSemester)=>{
    
const semesterData = await SemesterModel.create(semesterBody)

// const semesterId = semesterData._id
// if (Object.keys(semesterData).length) {

//  const x = await StudentModel.updateOne()   
// }
return semesterData

}

export const semesterService = {
    createSemesterDB
}