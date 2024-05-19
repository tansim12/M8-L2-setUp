"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    // format error
    res.status(500).send({
        message: err.message,
        errors: err.errors,
    });
    next();
};
exports.default = globalErrorHandler;
