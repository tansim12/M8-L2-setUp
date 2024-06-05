import { Response, Request } from "express";
import {
  errorResponse,
  successResponse,
} from "../../Re-useable/CustomResponse";
import { userService } from "./User.service";

const userPost = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;
    const password = req.body.password;

    const result: any = await userService.userPostDataDB(student, password);

    if (result.success === false) {
      return res.status(202).send(errorResponse(result));
    }
    res
      .status(200)
      .send(successResponse(result, "User Create Successfully done"));
  } catch (error) {
    res.status(500).send(errorResponse(error));
  }
};

export const userController = {
  userPost,
};
