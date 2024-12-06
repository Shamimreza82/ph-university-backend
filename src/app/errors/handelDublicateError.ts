/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handelDuplicateError = (err: any): TGenericErrorResponse => {

    const errorSources: TErrorSource = [{
        path: err?.keyValue, 
        message: err?.errmsg
    }]
  
    const statusCode = 400;
    return {
      statusCode,
      message: 'Duplicate key error',
      errorSources: errorSources,
    };
  };
  
  export default handelDuplicateError;
  