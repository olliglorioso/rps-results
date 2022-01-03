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
const axios_1 = __importDefault(require("axios"));
const typeGuards_1 = require("../typescript/typeGuards");
const customErrors_1 = require("../utils/customErrors");
// This function is responsible to fetch the history from the bad-api.
// It returns a promise of the result.
const historyFetch = (cursor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetching the API with axios-library.
        const history = yield axios_1.default.get(`https://bad-api-assignment.reaktor.com${cursor ? `${cursor}` : "/rps/history"}`);
        // First of all, parsing the result to ApiResponse.
        const parsedHistory = (0, typeGuards_1.parseHistory)(history.data);
        // If the cursor is invalid, the API returns an empty array as history and cursor is null.
        // This way, if the returned cursor is null, the sent cursor is invalid and thus the frontend
        // sent an invalid cursor.
        if (parsedHistory.cursor === null) {
            throw (0, customErrors_1.UserInputError)("Invalid cursor.");
        }
        // If the result is valid, return the data (before the current date is added).
        const returnHistory = parsedHistory.data.map((result) => {
            return Object.assign(Object.assign({}, result), { t: new Date(result.t) });
        });
        return { history: returnHistory, cursor: parsedHistory.cursor };
    }
    catch (e) {
        // If there is an error, it should be error from the API, so throw a ServerError.
        throw (0, customErrors_1.ServerError)("Error fetching history, because bad-api is down.");
    }
});
exports.default = historyFetch;
