import { Types } from "mongoose";

export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export interface TAddress {
  currentAddress: string;
  permanentAddress: string;
  district: string;
  zip: number;
}

export interface TName {
  firstName: string;
  lastName: string;
  middleName?: string;
}

export interface TAcademicFaculty {
  id?: string;
  name: TName;
  email: string;
  designation: string;
  age: number;
  user?: Types.ObjectId;
  academicDepartment?: Types.ObjectId;
  gender: "male" | "female" | "other";
  dateOfBirth?: string;
  blood: TBloodGroup;
  address: TAddress;
  contactNo: string;
  profileImg?: string;
  isDelete: boolean;
}
