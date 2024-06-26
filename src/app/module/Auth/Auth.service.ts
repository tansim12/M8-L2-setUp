import httpStatus from "http-status";
import AppError from "../../Error-Handle/AppError";
import UserModel from "../User/User.model";
import { TChangePassword, TLoginUser } from "./Auth.interface";
import { validateLoginPassword } from "../../Re-useable/BcryptValidatin";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// import Bcrypt from "bcrypt";

const loginDB = async (payload: TLoginUser) => {
  const { id, password } = payload;
  // validation is exists
  const user = await UserModel.findOne({ id });
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
  const accessToken = jwt.sign(
    {
      data: jwtPayload,
    },
    process.env.SECRET_ACCESS_TOKEN as string,
    { expiresIn: "10d" }
  );

  return { accessToken, needsPasswordChange: user?.needsPasswordChange };
};

// const changePasswordDB = async (id: string, payload: TChangePassword) => {
//   const { oldPassword, newPassword } = payload;
//   // validation is exists
//   const user = await UserModel.findOne({ id }).select("+password");
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "This User Not Found !");
//   }

//   // validate isExistsUserDeleted
//   const isExistsUserDeleted = user?.isDeleted;
//   if (isExistsUserDeleted) {
//     throw new AppError(httpStatus.NOT_FOUND, "This User Already Deleted !");
//   }

//   // status validate  0---> in-progress , 1---> blocked
//   const isExistsUserStatus = user?.status;
//   if (isExistsUserStatus === 1) {
//     throw new AppError(httpStatus.NOT_FOUND, "This User Blocked !");
//   }
//   // check password is correct
//   const checkPassword = await validateLoginPassword(
//     oldPassword,
//     user?.password
//   );
//   if (!checkPassword) {
//     throw new AppError(400, "Old Password dose not matched... Try again letter 😥");
//   }

//   // updating user model needPassword change false and password bcrypt
//   let newPasswordBcrypt;
//   if (checkPassword) {
//     newPasswordBcrypt = await Bcrypt.hash(
//       newPassword,
//       Number(process.env.BCRYPT_NUMBER)
//     );
//   }

//   if (!newPasswordBcrypt) {
//     throw new AppError(400, "Password Not Change here")
//   }

//   const result = await UserModel.findByIdAndUpdate(id, {
//     needsPasswordChange:false,
//     password:newPasswordBcrypt
//   })
//   if (result ) {
//     return result
//   }else{
//     throw new AppError(400, "Password Not Change here")
//   }
// };

export const authService = {
  loginDB,
  // changePasswordDB,
};
