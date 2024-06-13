import { Response, Request, NextFunction } from "express";
import {
  errorResponse,
  successResponse,
} from "../../Re-useable/CustomResponse";
import { userService } from "./User.service";

const userPost = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const student = req.body.student;
    const password = req.body.password;

    const result = await userService.userPostDataDB(student, password);
    res
      .status(200)
      .send(successResponse(result, "User Create Successfully done"));
  } catch (error) {
    next(error)
  }
};

export const userController = {
  userPost,
};
