import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handelCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {

    const errorSources: TErrorSource = [{
        path: err?.path, 
        message: err?.message

    }]

    const statusCode = 400;
        return {
            statusCode,
            message: 'Invalid Id',
            errorSources: errorSources,
          };
    }


export default handelCastError