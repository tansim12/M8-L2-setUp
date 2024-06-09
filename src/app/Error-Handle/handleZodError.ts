import { ZodError, ZodIssue } from "zod";
import { TerrorSources } from "../Interface/error";

const handleZodError = (err: ZodError) => {
    const errorSources: TerrorSources = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue?.path.length - 1],
        message: issue?.message,
      };
    });

    const statusCode = 400;
    return {
      statusCode,
      message: "zod error",
      errorSources,
    };
  };
  export default handleZodError