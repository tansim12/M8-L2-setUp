import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TerrorSources } from "../Interface/error";
import handleZodError from "./handleZodError";

import dotenv from "dotenv";
dotenv.config();

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong !";
  let errorSources: TerrorSources = [
    {
      path: "",
      message: "",
    },
  ];


  if (err instanceof ZodError) {
    const simplifyError = handleZodError(err);
    

    (statusCode = simplifyError?.statusCode),
      (message = simplifyError?.message),
      (errorSources = simplifyError?.errorSources);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: process.env.NODE_ENV === "development" ? err?.stack : null
  });
};

export default globalErrorHandler;

// throw new error pattern

/**
 * success
 * message
 * errorSources:[
 * path:"",
 * message:""]
 * stack:
 *
 * ]
 */
