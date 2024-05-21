import { Student } from "./Student.interface";
import StudentModel from "./Student.modal";

const createStudent = async (studentBody: Student) => {
  const isExist = await StudentModel.findOne({email:studentBody.email})
 if (isExist) {
  return {
    status:202,
    message:"user already exist"
    
  }
 }else{
  const result = await StudentModel.create(studentBody);
  return result;
 }
  
};

const allStudents=async()=>{
  const result = await StudentModel.find()
  return result
}

// get one student 
const oneStudent=async(id:string)=>{
  const result = await StudentModel.findOne({id:id})
  return result
}


export const studentService= {
  createStudent,allStudents,oneStudent
};
