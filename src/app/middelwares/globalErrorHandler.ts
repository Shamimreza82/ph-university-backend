/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import statuscode from 'http-status-codes';

import { NextFunction, Request, Response } from "express";


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const message = err.message || 'Something went wrong';
  
    res.status(statuscode.NOT_FOUND).json({
      success: false,
      message: message,
      error: err,
      stack: err.stack,
    });
    // next()
  }

  export default globalErrorHandler

