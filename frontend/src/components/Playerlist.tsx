import React, { useState } from "react";
import { List, ListItem, ListItemText, Link, Typography } from "@material-ui/core";
import { Player, RpsItem } from "../typescript/types";
import Emoji from "./Emoji";
import { winner } from "../util/helpers";
import styles from "../styles/Playerlist.style";

// This component is responsible of rendering the history of every player.
const Playerlist = ({ players }: { players: Player[]}): JSX.Element => {
    // Initiating the states of the players. Either they haven't been opened (the link with their name hasn't been clicked)
    // or they have. The state is set to false by default in the first command, and if the link with the player's name is clicked, the state
    // is set to true.
    const playerStates = players
        .reduce((a, v) => ({ ...a, [v.name]: false }), {});
    const [open, setOpen] = useState(playerStates);
    // This function is executed, when the link with the player's name is clicked.
    const handleClick = (player: string) => {
        // Set the state of the particual player to true.
        setOpen((prevState: Record<string, boolean>) => ({
            ...prevState,
            [player]: !prevState[player],
        }));
    };

    return (
        <div>
            <List style={styles.list}>
                {players.map((player: Player) => {
                    // Go through the names of the players.
                    // If the length is less 2, we render differently.
                    const width = players.length > 1 ? "33%" : "100%";
                    return (
                        <div key={player.name} style={{ width, display: "flex", justifyContent: "center", flexDirection: "column", alignContent: "center" }}>
                            <ListItem style={styles.listItem}>
                                <Link style={styles.link} onClick={() => handleClick(player.name)}>{player.name}</Link>
                            </ListItem>
                            {(open as Record<string, boolean>)[player.name] && (
                                // If the player is open, we render the data of that particular player.
                                <div style={styles.collapseContainer}>
                                    <ListItem>
                                        <ListItemText primary={`Win ratio: ${((player.wins / player.matches) * 100).toFixed(2)}%`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={`Matches: ${(player.matches)}`} />
                                    </ListItem>
                                    <ListItem >
                                        <Typography>Usual hand: <Emoji symbol={(player.usualHand)} /></Typography>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary={"Plays:"} />
                                    </ListItem>

                                    {player.plays.map((play: RpsItem) => {
                                        // Set the current player in the iteration and their opponent.
                                        const { currentPlayer, opponent } = play.playerA.name === player.name
                                            ? { currentPlayer: play.playerA, opponent: play.playerB }
                                            : { currentPlayer: play.playerB, opponent: play.playerA };
                                        // Get the winner.
                                        const winInfo = winner({ playerA: currentPlayer, playerB: opponent });
                                        const str = winInfo.result === "win" && winInfo.important.name === player.name ? ">" : winInfo.result === "tie" ? "=" : "<";
                                        return (
                                            <ListItem key={play.gameId + Math.random() * 1000} >
                                                <Typography>{new Date(play.t as number).toLocaleString()}: {player.name} {"&"} <Emoji symbol={currentPlayer.played} />
                                                    {str} {opponent.name} {"&"}
                                                    <Emoji symbol={opponent.played} />
                                                </Typography>
                                            </ListItem>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </List>
        </div>
    );
};

export default Playerlist;

