import httpStatus from "http-status";
import AppError from "../../Error-Handle/AppError";
import UserModel from "../User/User.model";
import { TLoginUser } from "./Auth.interface";
import { validateLoginPassword } from "../../Re-useable/BcryptValidatin";

const loginDB = async (payload: TLoginUser) => {
  const { id, password } = payload;
  // validation is exists
  const isExistUser = await UserModel.findOne({ id });
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Not Found !");
  }

  // validate isExistsUserDeleted
  const isExistsUserDeleted = isExistUser?.isDeleted;
  if (isExistsUserDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Already Deleted !");
  }

  // status validate  0---> in-progress , 1---> blocked
  const isExistsUserStatus = isExistUser?.status;
  if (isExistsUserStatus === 1) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Blocked !");
  }
  // check password is correct 
  const checkPassword = await validateLoginPassword(
    password,
    isExistUser?.password
  );
  if (!checkPassword) {
    throw new AppError(400, "Password dose not matched... Try again letter 😥");
  }

  return checkPassword;
};

export const authService = {
  loginDB,
};
