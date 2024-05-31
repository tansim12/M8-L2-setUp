import { create } from "domain";
import { TUser } from "./User.interface";
import UserModel from "./User.model";

const userPostDataDB = async (body: TUser) => {
  const result = await UserModel.create(body);
  return result
};

export const userService  = {
    userPostDataDB
} 