import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import AppError from "../Error-Handle/AppError";
import httpStatus from "http-status";
import { TUserRole } from "../module/User/User.interface";
dotenv.config();

// ...requiredRoles this is an array  using Rest operator
export const authMiddleWare = (...requiredRoles:TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      //   console.log({ token });
      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You are not Unauthorized !!!"
        );
      }

      jwt.verify(
        token as string,
        process.env.SECRET_ACCESS_TOKEN as string,
        function (err, decoded) {
          if (err) {
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              "You are not Unauthorized !!!"
            );
          }

          // check who access this section
          const role = (decoded as JwtPayload)?.data?.role;
          
          if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              "You are not Unauthorized !"
            );
          }
          req.user = (decoded as JwtPayload).data;
          next();
        }
      );
    } catch (error) {
      next(error);
    }
  };
};
