"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, _req, res, _next) => {
    if (error.name === "ServerError") {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        });
    }
    if (error.name === "UserInputError") {
        res.status(400).json({
            error: error.message,
            stack: error.stack
        });
    }
};
exports.default = errorHandler;
