"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const globalErrorHandler = (err, req, res, next) => {
    const message = err.message || 'Something went wrong';
    res.status(http_status_codes_1.default.NOT_FOUND).json({
        success: false,
        message: message,
        error: err,
        stack: err.stack,
    });
    // next()
};
exports.default = globalErrorHandler;
