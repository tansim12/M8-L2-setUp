import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

import { errorResponse } from "../Re-useable/CustomResponse";

const validationMiddleWare = (zodSchema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await zodSchema.parseAsync({
        body: req.body,
      });

      next();
    } catch (error) {
     next(error)
    }
  };
};
export default validationMiddleWare