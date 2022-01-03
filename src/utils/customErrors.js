"use strict";
// A couple of custom errors. One for server-side errors and one for users' errors.
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInputError = exports.ServerError = void 0;
const ServerError = (message) => {
    const e = new Error(message);
    e.name = "ServerError";
    return e;
};
exports.ServerError = ServerError;
const UserInputError = (message) => {
    const e = new Error(message);
    e.name = "UserInputError";
    return e;
};
exports.UserInputError = UserInputError;
