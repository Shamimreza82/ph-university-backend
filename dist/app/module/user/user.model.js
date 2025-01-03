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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangeAt: { type: Date },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty'],
        required: true,
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        required: true,
        default: 'in-progress',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        const password = yield bcrypt_1.default.hash(user.password, 10);
        user.password = password;
        next();
    });
});
// userSchema.post('findOne', function(doc, next){
//   doc.password = '';
//   next()
// })
userSchema.statics.isUserExistByCustomId = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ id }).select('+password');
    });
};
userSchema.statics.isPasswordMatch = function (plaintextPassword, hashPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plaintextPassword, hashPassword);
    });
};
userSchema.statics.isJWTIssuedBefourChangerd = function (passwordChangeTimeStamp, jwtIssuedTimeStamp) {
    return __awaiter(this, void 0, void 0, function* () {
        const passwordChangeTime = new Date(passwordChangeTimeStamp).getTime() / 1000;
        return passwordChangeTime > jwtIssuedTimeStamp;
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
