"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handelValidationError = (err) => {
    const errorSources = Object.values(err.errors).map((value) => {
        return {
            path: value === null || value === void 0 ? void 0 : value.path,
            message: value === null || value === void 0 ? void 0 : value.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'validation error',
        errorSources: errorSources,
    };
};
exports.default = handelValidationError;
