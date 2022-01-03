import { Dispatch, SetStateAction } from "react";

// This file contains all the types.

export interface PlayerItem {
    name: string;
    played: string;
}

export type SetHistory = Dispatch<SetStateAction<BackendResponse>>

export interface BackendResponse {
    history: RpsItem[];
    cursor: string;
}

export interface RpsItem {
    type: string;
    gameId: string;
    cursor: string;
    t: number;
    playerA: PlayerItem;
    playerB: PlayerItem;
}

export interface RpsHistory {
    cursor: string,
    data: RpsItem[]
}

export interface Player {
    name: string,
    matches: number,
    usualHand: string,
    wins: number,
    scissors: number,
    rocks: number,
    papers: number,
    plays: RpsItem[]
}

export interface LiveProps {
    onGoings: RpsItem[];
    event: string | undefined;
    results: RpsItem[];
}