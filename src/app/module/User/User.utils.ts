
import { TSemester } from "../Semester/Semester.interface";
import UserModel from "./User.model";

const latestId = async () => {
  const result = await UserModel.findOne({ role: "student" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  // id is 203001  0001
  return result?.id ? result.id : undefined;
};

export const generateId = async (payload: TSemester) => {
  // console.log(await latestId());

  let currentId = (0).toString();

  const getLatestId = await latestId(); // 2030 01 0001

  const getLatestYear = getLatestId?.substring(0, 4);
  const getLatestCode = getLatestId?.substring(4, 6);

  const currentCodeByPayload = payload.code;
  const currentYearByPayload = payload.year;

  if (
    getLatestId &&
    currentCodeByPayload === getLatestCode &&
    currentYearByPayload === getLatestYear
  ) {
    currentId = getLatestId.substring(6); // 0001
  }

  const increment = (Number(currentId) + 1).toString().padStart(4, "0");
  const id = `${payload.year}${payload.code}${increment}`;

  return id;
};



export const generateDynamicId = async (type: string) => {
  const facultyLatestId = async () => {
    const result = await UserModel.findOne({ role: type }, { id: 1, _id: 0 })
      .sort({ createdAt: -1 })
      .lean();
    // id is F-0001  // A-0001
    return result?.id ? result.id?.slice(2,6) : undefined;  // F-0001
  };

  
  let currentId = (0).toString();
  const getLatestId = await facultyLatestId();
  
  if (type  && getLatestId) {
    currentId = getLatestId as string; // 2030 01 0001
  }

  const increment = (Number(currentId) + 1).toString().padStart(4, "0");
  const id = `${type.slice(0,1).toUpperCase()}-${increment}`;

  return id;
};
