import { USER_ROLE } from "./User.const";

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangeAt?: Date;
  role: "student" | "faculty" | "admin";
  status: number; // 0 is in-progress  and 1 is blocked
  isDeleted: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
