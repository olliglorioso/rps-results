import React, { useState, useEffect } from "react";
import { BackendResponse, Player } from "../typescript/types";
import { TextField, Typography, Button, ListItem } from "@material-ui/core";
import { fetchMoreHistory } from "../util/requests";
import { RpsItem } from "../typescript/types";
import Playerlist from "./Playerlist";
import styles from "../styles/History.style";
import { historyUpdate, fetchData } from "../util/helpers";

const History = ({ results }: {results: RpsItem[]}) => {
    const [search, setSearch] = useState<string>("");
    const [history, setHistory] = useState<BackendResponse>({ history: [], cursor: "" });
    useEffect(() => {
        fetchData({ history, setHistory });
    }, [results]);

    if (!history) return <Typography>Loading..</Typography>;

    const players: Player[] = [];
    history.history.map((item: RpsItem) => {
        const defaultPlayer = { name: "", wins: 0, matches: 0, usualHand: "", scissors: 0, papers: 0, rocks: 0, plays: [] };
        if (!players.map((player: Player) => player.name).includes(item.playerA.name)) {
            players.push({ ...defaultPlayer, name: item.playerA.name });
        }
        if (!players.map((player: Player) => player.name).includes(item.playerB.name)) {
            players.push({ ...defaultPlayer, name: item.playerB.name });
        }
    });

    const updatePlayer = (player: Player, play: RpsItem) => {
        if (play.playerA.played === "SCISSORS" && play.playerB.played === "PAPER") player.wins++;
        else if (play.playerA.played === "PAPER" && play.playerB.played === "ROCK") player.wins++;
        else if (play.playerA.played === "ROCK" && play.playerB.played === "SCISSORS") player.wins++;
        if (play.playerA.played === "SCISSORS") player.scissors++;
        else if (play.playerA.played === "PAPER") player.papers++;
        else player.rocks++;
        player.matches++;
        player.plays = [...player.plays, play];
    };

    players.map((player: Player) => {
        history.history.map((play: RpsItem) => {
            const { playerA, playerB } = play;
            if (playerA.name === player.name || playerB.name === player.name) {
                updatePlayer(player, play);
            }
        });
        player.plays = player.plays.sort((a: RpsItem, b: RpsItem) => a.t < b.t ? 1 : -1);
    });
    players.map((player: Player) => {
        if (player.scissors > player.papers && player.scissors > player.rocks) player.usualHand = "SCISSORS";
        else if (player.papers > player.scissors && player.papers > player.rocks) player.usualHand = "PAPER";
        else if (player.rocks > player.scissors && player.rocks > player.papers) player.usualHand = "ROCK";
        else if (player.scissors === player.papers && player.scissors > player.rocks) player.usualHand = ["SCISSORS", "PAPER"].join(", ");
        else if (player.scissors === player.rocks && player.scissors > player.papers) player.usualHand = ["SCISSORS", "ROCK"].join(", ");
        else if (player.papers === player.rocks && player.papers > player.scissors) player.usualHand = ["PAPER", "ROCK"].join(", ");
        else if (player.scissors === player.papers && player.scissors === player.rocks) player.usualHand = ["SCISSORS", "PAPER", "ROCK"].join(", ");
    });
    players.sort((a: Player, b: Player) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    const filteredPlayers = players.filter((player: Player) => {
        return player.name.toLowerCase().includes(search.toLowerCase());
    });
    const fetchMore = async () => {
        const result = await fetchMoreHistory(history.cursor);
        historyUpdate(result, history, setHistory, "update");
    };

    return (
        <div style={styles.container}>
            <ListItem style={styles.buttonContainer}>
                <Button style={styles.button} onClick={() => fetchMore()}>Fetch more</Button>
            </ListItem>
            <TextField
                id="searchValue"
                label="Press enter to filter."
                onKeyPress={(e) => {
                    const value = document.getElementById("searchValue") as HTMLInputElement;
                    if (e.key === "Enter") {
                        setSearch(value.value);
                    }
                }}
            />
            <Playerlist players={filteredPlayers} />
        </div>
    );
};

export default History;