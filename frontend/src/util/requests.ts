import axios from "axios";
import { BackendResponse } from "../typescript/types";
// This file contains all the functions that make requests to the backend.
// FetchHistory fetches history for the first time from the backend. It has no parameters such as cursor.
export const fetchHistory = async (): Promise<BackendResponse> => {
    const history = await axios.get("http://localhost:3001/api/history");
    return history.data;
};

// FetchMoreHistory fetches history for 2nd-nth times. It has cursor as a parameter and
// backend fetches the API with the given cursor. The cursor is from the previous backend request.
// Backend responses always with history-data + new cursor for the next page.
export const fetchMoreHistory = async (cursor: string): Promise<BackendResponse> => {
    const history = await axios.get("http://localhost:3001/api/history/more", {
        params: {
            cursor
        }
    });
    return history.data;
};