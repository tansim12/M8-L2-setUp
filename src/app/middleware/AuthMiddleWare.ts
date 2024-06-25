import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import AppError from "../Error-Handle/AppError";
import httpStatus from "http-status";
dotenv.config();

export const authMiddleWare = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      //   console.log({ token });
      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "This user is Unauthorized !!!"
        );
      }

    jwt.verify(
        token as string,
        process.env.SECRET_ACCESS_TOKEN as string,
        function (err, decoded) {
          if (err) {
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              "This user is Unauthorized !!!"
            );
          }
          req.user = decoded  as JwtPayload
          next()
        }
      );
    
    } catch (error) {
      next(error);
    }
  };
};
