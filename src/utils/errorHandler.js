"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This handles all the errors that can occur in the backend.
// If the error is a ServerError, it is sent to the frontend as a 500 error.
// If the error is a UserInputError, it is sent to the frontend as a 400 error.
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
