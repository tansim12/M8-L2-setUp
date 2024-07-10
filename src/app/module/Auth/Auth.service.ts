import httpStatus from "http-status";
import AppError from "../../Error-Handle/AppError";
import UserModel from "../User/User.model";
import { TChangePassword, TLoginUser } from "./Auth.interface";
import { validateLoginPassword } from "../../Re-useable/BcryptValidatin";
import dotenv from "dotenv";
dotenv.config();
import Bcrypt from "bcrypt";
import { dynamicTokenGenerate } from "./Auth.utils";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const loginDB = async (payload: TLoginUser) => {
  const { id, password } = payload;
  // validation is exists
  const user = await UserModel.findOne({ id }).select("+password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Not Found !");
  }

  // validate isExistsUserDeleted
  const isExistsUserDeleted = user?.isDeleted;
  if (isExistsUserDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Already Deleted !");
  }

  // status validate  0---> in-progress , 1---> blocked
  const isExistsUserStatus = user?.status;
  if (isExistsUserStatus === 1) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Blocked !");
  }
  // check password is correct
  const checkPassword = await validateLoginPassword(password, user?.password);
  if (!checkPassword) {
    throw new AppError(400, "Password dose not matched... Try again letter 😥");
  }

  // implements jwt token
  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };
  const accessToken = dynamicTokenGenerate(
    jwtPayload,
    process.env.SECRET_ACCESS_TOKEN as string,
    process.env.SECRET_ACCESS_TOKEN_TIME as string
  );
  const refreshToken = dynamicTokenGenerate(
    jwtPayload,
    process.env.SECRET_REFRESH_TOKEN as string,
    process.env.SECRET_REFRESH_TOKEN_TIME as string
  );

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
    refreshToken,
  };
};

const changePasswordDB = async (id: string, payload: TChangePassword) => {
  const { oldPassword, newPassword } = payload;
  // validation is exists
  const user = await UserModel.findOne({ id }).select("+password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Not Found !");
  }

  // validate isExistsUserDeleted
  const isExistsUserDeleted = user?.isDeleted;
  if (isExistsUserDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Already Deleted !");
  }

  // status validate  0---> in-progress , 1---> blocked
  const isExistsUserStatus = user?.status;
  if (isExistsUserStatus === 1) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Blocked !");
  }
  // check password is correct
  const checkPassword = await validateLoginPassword(
    oldPassword,
    user?.password
  );
  if (!checkPassword) {
    throw new AppError(
      400,
      "Old Password dose not matched... Try again letter 😥"
    );
  }
  // updating user model needPassword change false and password bcrypt
  let newPasswordBcrypt;
  if (checkPassword) {
    newPasswordBcrypt = await Bcrypt.hash(
      newPassword,
      Number(process.env.BCRYPT_NUMBER)
    );
  }

  if (!newPasswordBcrypt) {
    throw new AppError(400, "Password Not Change here");
  }

  const result = await UserModel.findOneAndUpdate(
    { id },
    {
      needsPasswordChange: false,
      password: newPasswordBcrypt,
      passwordChangeAt: new Date(),
    }
  );
  if (result) {
    return null;
  } else {
    throw new AppError(400, "Password Not Change here");
  }
};


const refreshTokenDB = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !!!");
  }

  const decoded = jwt.verify(
    token as string,
    process.env.SECRET_REFRESH_TOKEN as string
  );

  // validation is exists
  const { id } = (decoded as JwtPayload).data;
  const { iat } = decoded as JwtPayload;

  const user = await UserModel.findOne({ id }).select("+password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Not Found !");
  }

  // validate isExistsUserDeleted
  const isExistsUserDeleted = user?.isDeleted;
  if (isExistsUserDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Already Deleted !");
  }

  // status validate  0---> in-progress , 1---> blocked
  const isExistsUserStatus = user?.status;
  if (isExistsUserStatus === 1) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Blocked !");
  }

  const passwordChangeConvertMilliSecond =
    new Date(user?.passwordChangeAt as Date).getTime() / 1000;
  const jwtIssueTime = iat as number;

  if (passwordChangeConvertMilliSecond > jwtIssueTime) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }

  // implements jwt token
  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };
  const accessToken = dynamicTokenGenerate(
    jwtPayload,
    process.env.SECRET_ACCESS_TOKEN as string,
    process.env.SECRET_ACCESS_TOKEN_TIME as string
  );

  return accessToken;
};

export const authService = {
  loginDB,
  changePasswordDB,
  refreshTokenDB,
};
