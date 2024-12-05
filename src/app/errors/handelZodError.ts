import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";
import { StatusCodes } from "http-status-codes";

const handelZodError = (err: ZodError) => {
    const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });
    const statusCode = StatusCodes.NOT_FOUND;

    return {
      statusCode,
      message: 'validation error',
      errorSources: errorSources,
    };
  };

export default handelZodError