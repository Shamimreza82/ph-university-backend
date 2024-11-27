"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const userSchemaValidation = zod_1.default.object({
    password: zod_1.default
        .string({ invalid_type_error: "Name must be a string" })
        .min(8, 'Password must be at least 8 characters long')
        .max(20, 'Password must be at most 20 characters long')
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one letter, one number, and no spaces'),
});
exports.default = userSchemaValidation;
