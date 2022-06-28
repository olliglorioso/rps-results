interface Player {
    name: string;
    played: string;
}

export interface RpsItem {
    type: string;
    gameId: string;
    t: number;
    playerA: Player;
    playerB: Player;
    cursor: string;
}

export interface ApiResponse {
    cursor: string,
    data: RpsItem[]
}