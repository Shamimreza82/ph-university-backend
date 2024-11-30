import { NextFunction, Request, RequestHandler, Response } from "express";


//// this a hair order function and this function resive a async function and retune promise a resolve function.
const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch((err => next(err)))
    };
  };


export default catchAsync