import { ServerError, UserInputError } from "../utils/customErrors";
import { ApiResponse } from "./types";


const isHistory = (history: unknown): history is ApiResponse => {
    if (typeof history !== "object") {
        return false;
    }
    const historyObj = history as ApiResponse;
    if (typeof historyObj.cursor !== "string") {
        return false;
    }
    if (!Array.isArray(historyObj.data)) {
        return false;
    }
    return true;
};

const isString = (str: unknown): str is string => {
    if (typeof str !== "string") {
        return false;
    }
    return true;
};

export const parseHistory = (history: unknown): ApiResponse => {
    if (!history || typeof history !== "object" || !isHistory(history)) {
        throw ServerError("Invalid history object.");
    }
    return history;
};

export const parseCursor = (cursor: unknown): string => {
    if (!cursor || !isString(cursor)) {
        throw UserInputError("Invalid cursor.");
    }
    return cursor;
};


