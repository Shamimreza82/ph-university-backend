"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envFile = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.envFile = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    data_base_url: process.env.DATABASE_URL,
    default_password: process.env.DEFAULT_PASS,
    salt_round_pass: process.env.SALT_ROUND_PASS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
};
