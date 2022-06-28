import { BackendResponse, RpsItem, PlayerItem, SetHistory } from "../typescript/types";
import { Dispatch, SetStateAction } from "react";
import { fetchHistory } from "./requests";

export const historyUpdate = (result: BackendResponse, history: BackendResponse, setHistory: Dispatch<SetStateAction<BackendResponse>>, update?: string) => {
    const gameIds = history.history.map((game: RpsItem) => game.gameId);
    setHistory({ history: [...history.history, ...result.history.filter(item => !gameIds.includes(item.gameId))], cursor: update ? result.cursor : history.cursor });
};

export const winner = ({ playerA, playerB }: { playerA: PlayerItem, playerB: PlayerItem }): { result: string, important: PlayerItem }  => {
    if (playerA.played === "SCISSORS" && playerB.played === "PAPER") return { result: "win", important: playerA };
    else if (playerA.played === "PAPER" && playerB.played === "ROCK") return { result: "win", important: playerA };
    else if (playerA.played === "ROCK" && playerB.played === "SCISSORS") return { result: "win", important: playerA };
    else if (playerB.played === "SCISSORS" && playerA.played === "PAPER") return { result: "win", important: playerB };
    else if (playerB.played === "PAPER" && playerA.played === "ROCK") return { result: "win", important: playerB };
    else if (playerB.played === "ROCK" && playerA.played === "SCISSORS") return { result: "win", important: playerB };
    else return { result: "tie", important: playerA };
};

export const fetchData = async ({ history, setHistory }: { history: BackendResponse, setHistory: SetHistory }) => {
    const result = await fetchHistory();
    if (history.history.length === 0) {
        setHistory(result);
    } else {
        historyUpdate(result, history, setHistory);
    }
};