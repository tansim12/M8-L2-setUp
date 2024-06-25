import { RequestHandler } from "express";
import { authService } from "./Auth.service";
import { successResponse } from "../../Re-useable/CustomResponse";

const login: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.loginDB(req.body);
    res.status(200).send(successResponse(result, "Login SuccessFully Done "));
  } catch (error) {
    next(error);
  }
};

export const authController = {
  login,
};
