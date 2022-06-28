import axios from "axios";
import { BackendResponse } from "../typescript/types";
const uri = process.env.CROSS_ENV === "dev"
    ? "http://localhost:3001/api/history"
    : "https://rps-results-2022.herokuapp.com/api/history";
export const fetchHistory = async (): Promise<BackendResponse> => {
    const history = await axios.get(uri);
    return history.data;
};

export const fetchMoreHistory = async (cursor: string): Promise<BackendResponse> => {
    const history = await axios.get(`${uri}/more`, {
        params: {
            cursor
        }
    });
    return history.data;
};
