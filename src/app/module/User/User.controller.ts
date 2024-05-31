import { Response, Request } from "express";
import {
  errorResponse,
  successResponse,
} from "../../Re-useable/CustomResponse";
import UserSchemaZod from "./User.zodValidation";
import { userService } from "./User.service";

const userPost = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const parseZodBody = UserSchemaZod.parse(body);
    const result: any = await userService.userPostDataDB(parseZodBody);
    if (result) {
      res
        .status(200)
        .send(successResponse(result, "User Create Successfully done"));
    }
  } catch (error) {
    res.status(500).send(errorResponse(error));
  }
};

export const userController = {
  userPost,
};
