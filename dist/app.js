"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalErrorHandle_1 = __importDefault(require("../src/app/Error-Handle/globalErrorHandle"));
const normalMiddleware_1 = __importDefault(require("../src/app/middleware/normalMiddleware"));
const app = (0, express_1.default)();
(0, normalMiddleware_1.default)(app);
app.get("/", (req, res) => {
    res.send("Level-2 setup ");
});
app.all("*", (req, res, next) => {
    const error = new Error(`Can't find ${req.url} on the server`);
    next(error);
});
// global error handle
app.use(globalErrorHandle_1.default);
exports.default = app;
