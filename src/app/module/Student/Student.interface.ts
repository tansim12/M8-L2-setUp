import { Types } from "mongoose";

export interface Address {
  currentAddress: string;
  permanentAddress: string;
  district: string;
  zip: number;
}

export interface Guardian {
  fatherName: string;
  motherName: string;
  fatherMobNo: string;
  motherMobNo: string;
  fatherOccupation: string;
  motherOccupation: string;
}

export interface Name {
  firstName: string;
  lastName: string;
  middleName?: string;
}

export interface Student {
  id?: string;
  name: Name;
  email: string;
  age: number;
  user?: Types.ObjectId,
  admissionSemester?: Types.ObjectId,
  gender: "male" | "female" | "other";
  dateOfBirth?: string;
  blood: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  address: Address;
  guardian: Guardian;
  contactNo: string;
  profileImg?: any;
  isActive: "active" | "inactive";
  isDelete:boolean
}
