"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middelwares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middelwares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1', routes_1.default);
// const test =  (req: Request, res: Response) => {
// };
// app.use('/', test)
/////global error handler
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
