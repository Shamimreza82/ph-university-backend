"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// this a hair order function and this function resive a async function and retune promise a resolve function.
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err => next(err)));
    };
};
exports.default = catchAsync;
