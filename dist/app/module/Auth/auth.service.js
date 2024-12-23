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
const user_model_1 = require("../user/user.model");
const config_1 = require("../../../config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_ults_1 = __importDefault(require("./auth.ults"));
const sendEmail_1 = require("../../utils/sendEmail");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistByCustomId(payload === null || payload === void 0 ? void 0 : payload.id);
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
    ////password check
    if (!(yield user_model_1.User.isPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new Error(`Password dose not match`);
    }
    /// create token and send to the client
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    // const accessToken = jwt.sign(
    //   jwtPayload,
    //   envFile.jwt_access_secret as string,
    //   { expiresIn: '10d' },
    // );
    // const refreshToken = jwt.sign(
    //   jwtPayload,
    //   envFile.jwt_refrishAccess_secret as string,
    //   { expiresIn: '10d' },
    // );
    const assessToken = (0, auth_ults_1.default)(jwtPayload, config_1.envFile.jwt_access_secret, config_1.envFile.JWT_ACCESS_EXPIRE_IN);
    const refreshToken = (0, auth_ults_1.default)(jwtPayload, config_1.envFile.jwt_refrishAccess_secret, config_1.envFile.JWT_REFRESH_EXPIRE_IN);
    return {
        assessToken,
        refreshToken,
        needsPasswordChange: user === null || user === void 0 ? void 0 : user.needsPasswordChange,
    };
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userData);
    const user = yield user_model_1.User.isUserExistByCustomId(userData === null || userData === void 0 ? void 0 : userData.userId);
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
    ////password check
    if (!(yield user_model_1.User.isPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.oldPassword, user === null || user === void 0 ? void 0 : user.password))) {
        throw new Error(`Password dose not match`);
    }
    ///// has new password
    const newHashPassword = yield bcrypt_1.default.hash(payload === null || payload === void 0 ? void 0 : payload.newPassword, Number(config_1.envFile.salt_round_pass));
    yield user_model_1.User.findOneAndUpdate({
        id: userData.userId,
        role: userData.role,
    }, {
        password: newHashPassword,
        needsPasswordChange: false,
        passwordChangeAt: new Date(),
    });
    return null;
});
const forgetPassword = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistByCustomId(userId);
    if (!user) {
        throw new Error('This user is not found');
    }
    const isDeletedUser = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeletedUser) {
        throw new Error('This user is Deleted');
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === 'blocked') {
        throw new Error(`This user is Blocked`);
    }
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const resetToken = (0, auth_ults_1.default)(jwtPayload, config_1.envFile.jwt_access_secret, '10m');
    const resetUiLink = `http://localhost:5000?id=${user === null || user === void 0 ? void 0 : user.id}&token=${resetToken}`;
    (0, sendEmail_1.sendEmail)();
});
exports.AuthServices = {
    loginUser,
    changePassword,
    forgetPassword
};
