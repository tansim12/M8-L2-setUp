
import StudentModel from "./Student.modal";
const allStudents = async () => {
  const result = await StudentModel.find().populate("admissionSemester").populate({
    path:"academicDepartment",
    populate:{
      path:"academicFaculty"
    }
  });
  return result;
};

// get one student
const oneStudent = async (id: string) => {
  // const result = await StudentModel.findOne({ id: id });
  const result = await StudentModel.findById(id).populate("admissionSemester").populate({
    path:"academicDepartment",
    populate:{
      path:"academicFaculty"
    }
  })

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
  const result = await StudentModel.updateOne({ id }, { isDelete: true });
  console.log(result);
  if (result.modifiedCount >0) {
    return result
  }else{
    return {
      success: false,
      message: "No find Data",
    };
  }
  
  
};

export const studentService = {
 
  allStudents,
  oneStudent,
  deleteById,
};
