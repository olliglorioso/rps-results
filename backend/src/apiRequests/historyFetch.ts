import axios from "axios";
import { parseHistory } from "../typescript/typeGuards";
import { RpsItem } from "../typescript/types";
import { ServerError, UserInputError } from "../utils/customErrors";

// This function is responsible to fetch the history from the bad-api.
// It returns a promise of the result.
const historyFetch = async (cursor?: string): Promise<RpsItem[] | unknown> => {
    try {
        // Fetching the API with axios-library.
        const history = await axios.get(`https://bad-api-assignment.reaktor.com${cursor ? `${cursor}` : "/rps/history"}`);
        // First of all, parsing the result to ApiResponse.
        const parsedHistory = parseHistory(history.data);
        // If the cursor is invalid, the API returns an empty array as history and cursor is null.
        // This way, if the returned cursor is null, the sent cursor is invalid and thus the frontend
        // sent an invalid cursor.
        if (parsedHistory.cursor === null) {
            throw UserInputError("Invalid cursor.");
        }
        // If the result is valid, return the data (before the current date is added).
        const returnHistory = parsedHistory.data.map((result: RpsItem) => {
            return { ...result, t: new Date(result.t) };
        });
        return { history: returnHistory, cursor: parsedHistory.cursor };
    } catch (e) {
        // If there is an error, it should be error from the API, so throw a ServerError.
        throw ServerError("Error fetching history, because bad-api is down.");
    }
};

export default historyFetch;
