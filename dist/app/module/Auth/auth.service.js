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
exports.AuthServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../user/user.model");
const config_1 = require("../../../config");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistByCustomId(payload === null || payload === void 0 ? void 0 : payload.id);
    if (!user) {
        throw new Error("This user is not found");
    }
    //// chaking if the user is already deleted 
    const isDeletedUser = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeletedUser) {
        throw new Error("This user is Deleted");
    }
    //// chaking if the user is already deleted 
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === 'blocked') {
        throw new Error(`This user is Blocked`);
    }
    ////password check 
    if (!(yield user_model_1.User.isPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new Error(`Password dose not match`);
    }
    /// create token and send to the client 
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.envFile.jwt_access_secret, { expiresIn: '10d' });
    return {
        accessToken,
        needsPasswordChange: user === null || user === void 0 ? void 0 : user.needsPasswordChange
    };
});
exports.AuthServices = {
    loginUser
};
