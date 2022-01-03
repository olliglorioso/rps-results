import React, { useState, useEffect } from "react";
import { BackendResponse, Player } from "../typescript/types";
import { TextField, Typography, Button, ListItem } from "@material-ui/core";
import { fetchMoreHistory } from "../util/requests";
import { RpsItem } from "../typescript/types";
import Playerlist from "./Playerlist";
import styles from "../styles/History.style";
import { historyUpdate, fetchData } from "../util/helpers";

// This component is responsible of rendering the Playerlist and has a couple other important things,
// such as the search bar and the fetchMoreHistory function.
const History = ({ results }: {results: RpsItem[]}) => {
    // State for the current string in the input field.
    const [search, setSearch] = useState<string>("");
    // State for the history data from the API and cursor.
    const [history, setHistory] = useState<BackendResponse>({ history: [], cursor: "" });
    // This useEffect is called when the state of "results" from the Live component changes.
    // Results changes every time a new game has started or an ongoing ended.
    useEffect(() => {
        // fetchData-function is called.
        fetchData({ history, setHistory });
        // fetchData is explained in the helpers.ts.
    }, [results]);

    // If there is no data/the data hasn't arrived yet, return loading.
    if (!history) return <Typography>Loading..</Typography>;

    // Initiate the list of players.
    const players: Player[] = [];
    // Adding the players from the history to the list of players.
    history.history.map((item: RpsItem) => {
        // Creating a variable for the default settings of a new player.
        const defaultPlayer = { name: "", wins: 0, matches: 0, usualHand: "", scissors: 0, papers: 0, rocks: 0, plays: [] };
        // If the player map doesn't contain the player A / player B, we add it to the list of players.
        if (!players.map((player: Player) => player.name).includes(item.playerA.name)) {
            players.push({ ...defaultPlayer, name: item.playerA.name });
        }
        if (!players.map((player: Player) => player.name).includes(item.playerB.name)) {
            players.push({ ...defaultPlayer, name: item.playerB.name });
        }
    });

    // Function that is called during the iteration of history items, and it updates player's statistics.
    const updatePlayer = (player: Player, play: RpsItem) => {
        // Checks which player (A or B) is the winner of an individual match, and updates the
        // winner's wins. If it is a tie, nothing is updated.
        if (play.playerA.played === "SCISSORS" && play.playerB.played === "PAPER") player.wins++;
        else if (play.playerA.played === "PAPER" && play.playerB.played === "ROCK") player.wins++;
        else if (play.playerA.played === "ROCK" && play.playerB.played === "SCISSORS") player.wins++;
        // Update the variable that keeps track of the number amount of scissors/papers/rocks the player has played.
        if (play.playerA.played === "SCISSORS") player.scissors++;
        else if (play.playerA.played === "PAPER") player.papers++;
        else player.rocks++;
        // Add one match to variable that keeps track of the amount of matches the player has played.
        player.matches++;
        // Add the item for the game to the player's list of plays.
        player.plays = [...player.plays, play];
    };

    // Iterate through the players-list.
    players.map((player: Player) => {
        // Iterate through the history-list for every player.
        history.history.map((play: RpsItem) => {
            const { playerA, playerB } = play;
            // The player is either one of the two players of this individual match or has nothing to do
            // with this particular game.
            // If the current player from the players-list is the player A or B in this individual match,
            // update the player's statistics.
            if (playerA.name === player.name || playerB.name === player.name) {
                updatePlayer(player, play);
            }
        });
        // At the end of updating a single player, we sort their plays by time.
        player.plays = player.plays.sort((a: RpsItem, b: RpsItem) => a.t < b.t ? 1 : -1);
    });
    // Following map-function is used to set the most used hand of each player.
    players.map((player: Player) => {
        // Search for the biggest amount of scissors/papers/rocks the player has played.
        // If there are multiple with the same amount of plays, the most used hand is set to the hands that have
        // tied as string (e.g. "SCISSORS, ROCK").
        if (player.scissors > player.papers && player.scissors > player.rocks) player.usualHand = "SCISSORS";
        else if (player.papers > player.scissors && player.papers > player.rocks) player.usualHand = "PAPER";
        else if (player.rocks > player.scissors && player.rocks > player.papers) player.usualHand = "ROCK";
        else if (player.scissors === player.papers && player.scissors > player.rocks) player.usualHand = ["SCISSORS", "PAPER"].join(", ");
        else if (player.scissors === player.rocks && player.scissors > player.papers) player.usualHand = ["SCISSORS", "ROCK"].join(", ");
        else if (player.papers === player.rocks && player.papers > player.scissors) player.usualHand = ["PAPER", "ROCK"].join(", ");
        else if (player.scissors === player.papers && player.scissors === player.rocks) player.usualHand = ["SCISSORS", "PAPER", "ROCK"].join(", ");
    });
    // Sort by the alphabetical order of the player's names.
    players.sort((a: Player, b: Player) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    // Create a variable that includes all the names of the players. This variable is used in the search, we don't want to
    // use the large list of players' and their stats in the search, just their name. And when more information of a player is needed, we search for it from the players-list
    // with the name.FilteredNames includes all the names that match the search-string.
    const filteredPlayers = players.filter((player: Player) => {
        return player.name.toLowerCase().includes(search.toLowerCase());
    });
    // Function that is called when the user clicks on the "fetch more" -button in order to get more (mainly older or unforeseen recent games) data from the API.
    const fetchMore = async () => {
        // Fetch data from the API with fetchMoreHistory-function, that requires the cursor as a parameter in order to get the next page of data.
        const result = await fetchMoreHistory(history.cursor);
        // After the data has arrived, we update the history-variable with the new data and the cursor (with the historyUpdate-function).
        historyUpdate(result, history, setHistory, "update");
    };

    // Return the TSX element.
    return (
        <div style={styles.container}>
            <ListItem style={styles.buttonContainer}>
                <Button style={styles.button} onClick={() => fetchMore()}>Fetch more</Button>
            </ListItem>
            <TextField
                id="searchValue"
                label="Press enter to filter."
                onKeyPress={(e) => {
                    // When enter is pressed, the value of search-input is set to the value of the search-state.
                    // And so the players-list is filtered after the enter.
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