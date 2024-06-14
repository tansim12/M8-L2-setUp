import { Types } from "mongoose";

export interface TPreRequisiteCourses {
  course: Types.ObjectId;
  isDelete: boolean;
}

export interface TCourse {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: [TPreRequisiteCourses];
  isDelete: boolean;
}
