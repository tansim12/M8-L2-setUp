import { RequestHandler } from "express";
import { authService } from "./Auth.service";
import { successResponse } from "../../Re-useable/CustomResponse";

const login: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.loginDB(req.body);
    const { refreshToken, accessToken, needsPasswordChange } = result;
    res.cookie("refreshToken", refreshToken, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });
    res
      .status(200)
      .send(
        successResponse(
          { accessToken, needsPasswordChange },
          "Password Change Successfully done "
        )
      );
  } catch (error) {
    next(error);
  }
};
const changePassword: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.changePasswordDB(req?.user?.id, req.body);
    res
      .status(200)
      .send(successResponse(result, "Password Change Successfully done "));
  } catch (error) {
    next(error);
  }
};
const refreshToken: RequestHandler = async (req, res, next) => {
  try { 
    const result = await authService.refreshTokenDB(req?.cookies.refreshToken);
    console.log(result);
    
    res
      .status(200)
      .send(successResponse(result, "Refresh Token send Successfully done "));
  } catch (error) {
    next(error);
  }
};

export const authController = {
  login,
  changePassword,
  refreshToken,
};
