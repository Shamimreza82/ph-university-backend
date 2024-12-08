/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error';
import { envFile } from '../../config';
import handelZodError from '../errors/handelZodError';
import handelValidationError from '../errors/handelValidationError';
import handelCastError from '../errors/handelCastError';
import handelDuplicateError from '../errors/handelDublicateError';
import AppError from '../errors/AppError';




const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  ////default Error 
  let statusCode = err.stat || 500;
  let message = err.message || 'Something went wrong';
  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];





////////Zor error handel for verieais cases 
  if (err instanceof ZodError) {
    const simplifiedError = handelZodError(err);
    statusCode = simplifiedError?.statusCode; 
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.name === 'ValidationError'){
    const simplifiedError = handelValidationError(err);
    statusCode = simplifiedError?.statusCode; 
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err.name === "CastError"){
    const simplifiedError = handelCastError(err);
    statusCode = simplifiedError?.statusCode; 
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  }else if (err?.errorResponse?.code === 11000){
    const simplifiedError = handelDuplicateError(err);
    statusCode = simplifiedError?.statusCode; 
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  }
  
  else if (err instanceof AppError){
    statusCode = err?.statusCode; 
    message = err?.message
    errorSources = [{
      path: '', 
      message: err?.message
    }]
  }
  else if (err instanceof Error){
    message = err?.message;
    errorSources = [{
      path: '', 
      message: err?.message
    }]
  }

 




  res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    stack: envFile.NODE_ENV === 'development' ?  err?.stack : undefined,
   
  });
};

export default globalErrorHandler;
