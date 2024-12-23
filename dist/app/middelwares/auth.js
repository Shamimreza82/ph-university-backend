"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const user_model_1 = require("../module/user/user.model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error('you are not authorized');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.envFile.jwt_access_secret);
        const { role, userId, iat } = decoded;
        ///
        const user = yield user_model_1.User.isUserExistByCustomId(userId);
        if (!user) {
            throw new Error('This user is not found');
        }
        //// chaking if the user is already deleted
        const isDeletedUser = user === null || user === void 0 ? void 0 : user.isDeleted;
        if (isDeletedUser) {
            throw new Error('This user is Deleted');
        }
        //// chaking if the user is already deleted
        const userStatus = user === null || user === void 0 ? void 0 : user.status;
        if (userStatus === 'blocked') {
            throw new Error(`This user is Blocked`);
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new Error('you are not authorized role ');
        }
        if (user.passwordChangeAt && (yield user_model_1.User.isJWTIssuedBefourChangerd(user === null || user === void 0 ? void 0 : user.passwordChangeAt, iat))) {
            throw new Error('your token is expire, you are unauthorize');
        }
        req.user = decoded;
        next();
        // if (token) {
        //   jwt.verify(
        //     token,
        //     envFile.jwt_access_secret as string,
        //     function (err, decoded) {
        //       if (err) {
        //         throw new Error('you are not authorized');
        //       }
        //       const role = (decoded as JwtPayload).role;
        //       if (requiredRoles && !requiredRoles.includes(role)) {
        //         throw new Error('you are not authorized role ');
        //       }
        //       req.user = decoded as Record<string, unknown>;
        //       next();
        //     },
        //   );
        // }
    }));
};
exports.default = auth;
