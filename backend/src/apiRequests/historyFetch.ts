import axios from "axios";
import { parseHistory } from "../typescript/typeGuards";
import { RpsItem } from "../typescript/types";
import { ServerError, UserInputError } from "../utils/customErrors";

const historyFetch = async (cursor?: string): Promise<RpsItem[] | unknown> => {
    try {
        const parsedHistory = parseHistory(history.data);
        if (parsedHistory.cursor === null) {
            throw UserInputError("Invalid cursor.");
        }
        const returnHistory = parsedHistory.data.map((result: RpsItem) => {
            return { ...result, t: new Date(result.t) };
        });
        return { history: returnHistory, cursor: parsedHistory.cursor };
    } catch (e) {
        throw ServerError("Error fetching history, because bad-api is down.");
    }
};

export default historyFetch;
