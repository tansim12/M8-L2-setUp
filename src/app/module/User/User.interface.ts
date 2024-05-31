export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: "student" | "faculty" | "admin";
  status: number; // 0 is in-progress  and 1 is blocked
  isDeleted: boolean;
  
}
