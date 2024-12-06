"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
const handelDuplicateError = (err) => {
    const errorSources = [{
            path: err === null || err === void 0 ? void 0 : err.keyValue,
            message: err === null || err === void 0 ? void 0 : err.errmsg
        }];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Duplicate key error',
        errorSources: errorSources,
    };
};
exports.default = handelDuplicateError;
