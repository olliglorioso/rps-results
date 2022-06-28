"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCursor = exports.parseHistory = void 0;
const customErrors_1 = require("../utils/customErrors");
const isHistory = (history) => {
    if (typeof history !== "object") {
        return false;
    }
    const historyObj = history;
    if (typeof historyObj.cursor !== "string") {
        return false;
    }
    if (!Array.isArray(historyObj.data)) {
        return false;
    }
    return true;
};
const isString = (str) => {
    if (typeof str !== "string") {
        return false;
    }
    return true;
};
const parseHistory = (history) => {
    if (!history || typeof history !== "object" || !isHistory(history)) {
        throw (0, customErrors_1.ServerError)("Invalid history object.");
    }
    return history;
};
exports.parseHistory = parseHistory;
const parseCursor = (cursor) => {
    if (!cursor || !isString(cursor)) {
        throw (0, customErrors_1.UserInputError)("Invalid cursor.");
    }
    return cursor;
};
exports.parseCursor = parseCursor;
