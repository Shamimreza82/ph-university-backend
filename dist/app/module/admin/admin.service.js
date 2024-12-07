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
exports.AdminServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const admin_model_1 = require("./admin.model");
const user_model_1 = require("../user/user.model");
const getAllAdminDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = admin_model_1.Admin.find();
    return result;
});
const getSingleAdminDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = admin_model_1.Admin.findOne({ id });
    return result;
});
const updateAdminDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = payload.admin;
    const result = yield admin_model_1.Admin.findOneAndUpdate({ id }, admin, { new: true });
    return result;
});
const deleteAdminDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        yield session.startTransaction();
        const deleteUser = yield user_model_1.User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deleteUser) {
            throw new Error("failed to deleted user");
        }
        const deleteAdmin = yield admin_model_1.Admin.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deleteAdmin) {
            throw new Error("failed to deleted Admin");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deleteAdmin;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
exports.AdminServices = {
    getAllAdminDB,
    getSingleAdminDB,
    updateAdminDB,
    deleteAdminDB
};
