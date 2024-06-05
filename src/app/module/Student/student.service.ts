
import StudentModel from "./Student.modal";
const allStudents = async () => {
  const result = await StudentModel.find();
  return result;
};

// get one student
const oneStudent = async (id: string) => {
  // const result = await StudentModel.findOne({ id: id });
  const result = await StudentModel.aggregate([
    {
      $match: { id: id },
    },
  ]);
  if (result.length) {
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
