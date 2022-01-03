import { ServerError, UserInputError } from "../utils/customErrors";
import { ApiResponse } from "./types";

// This file includes all the type guards used in the backend. They parse different inputs.

// IsHistory checks if the data from the API is valid.
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

// IsString checks if the parameter is a string.
const isString = (str: unknown): str is string => {
    if (typeof str !== "string") {
        return false;
    }
    return true;
};

// ParseHistory parses history from the API.
export const parseHistory = (history: unknown): ApiResponse => {
    if (!history || typeof history !== "object" || !isHistory(history)) {
        throw ServerError("Invalid history object.");
    }
    return history;
};

// ParseCursor parses the cursor from the frontend.
export const parseCursor = (cursor: unknown): string => {
    if (!cursor || !isString(cursor)) {
        throw UserInputError("Invalid cursor.");
    }
    return cursor;
};


