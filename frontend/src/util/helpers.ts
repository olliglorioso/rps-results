import { BackendResponse, RpsItem, PlayerItem, SetHistory } from "../typescript/types";
import { Dispatch, SetStateAction } from "react";
import { fetchHistory } from "./requests";

// This file includes random helpful functions.
// This file updates history-state every time a new set is data is available.
// It maps through history and ensures, that no game is rendered two times in the History.
export const historyUpdate = (result: BackendResponse, history: BackendResponse, setHistory: Dispatch<SetStateAction<BackendResponse>>, update?: string) => {
    // Get all gameIds in the history-state.
    const gameIds = history.history.map((game: RpsItem) => game.gameId);
    // Set history with the result from the backend. If a particular result exists in the gameIds,
    // it will not be added.
    setHistory({ history: [...history.history, ...result.history.filter(item => !gameIds.includes(item.gameId))], cursor: update ? result.cursor : history.cursor });
};

export const winner = ({ playerA, playerB }: { playerA: PlayerItem, playerB: PlayerItem }): { result: string, important: PlayerItem }  => {
    // Get the winner/tie of a particular game, parameters are the two players that are opponents. Basic rps rules.
    if (playerA.played === "SCISSORS" && playerB.played === "PAPER") return { result: "win", important: playerA };
    else if (playerA.played === "PAPER" && playerB.played === "ROCK") return { result: "win", important: playerA };
    else if (playerA.played === "ROCK" && playerB.played === "SCISSORS") return { result: "win", important: playerA };
    else if (playerB.played === "SCISSORS" && playerA.played === "PAPER") return { result: "win", important: playerB };
    else if (playerB.played === "PAPER" && playerA.played === "ROCK") return { result: "win", important: playerB };
    else if (playerB.played === "ROCK" && playerA.played === "SCISSORS") return { result: "win", important: playerB };
    else return { result: "tie", important: playerA };
};

export const fetchData = async ({ history, setHistory }: { history: BackendResponse, setHistory: SetHistory }) => {
    // Fetch data with fetchHistory-function. If this is the first time data is fetched,
    // just setHistory immediatelly. Otherwise, add only new results.
    const result = await fetchHistory();
    if (history.history.length === 0) {
        setHistory(result);
    } else {
        historyUpdate(result, history, setHistory);
    }
};