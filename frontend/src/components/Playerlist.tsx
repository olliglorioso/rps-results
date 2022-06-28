import React, { useState } from "react";
import { List, ListItem, ListItemText, Link, Typography } from "@material-ui/core";
import { Player, RpsItem } from "../typescript/types";
import Emoji from "./Emoji";
import { winner } from "../util/helpers";
import styles from "../styles/Playerlist.style";

const Playerlist = ({ players }: { players: Player[]}): JSX.Element => {
    const playerStates = players
        .reduce((a, v) => ({ ...a, [v.name]: false }), {});
    const [open, setOpen] = useState(playerStates);
    const handleClick = (player: string) => {
        setOpen((prevState: Record<string, boolean>) => ({
            ...prevState,
            [player]: !prevState[player],
        }));
    };

    return (
        <div>
            <List style={styles.list}>
                {players.map((player: Player) => {
                    const width = players.length > 1 ? "33%" : "100%";
                    return (
                        <div key={player.name} style={{ width, display: "flex", justifyContent: "center", flexDirection: "column", alignContent: "center" }}>
                            <ListItem style={styles.listItem}>
                                <Link style={styles.link} onClick={() => handleClick(player.name)}>{player.name}</Link>
                            </ListItem>
                            {(open as Record<string, boolean>)[player.name] && (
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
                                        const { currentPlayer, opponent } = play.playerA.name === player.name
                                            ? { currentPlayer: play.playerA, opponent: play.playerB }
                                            : { currentPlayer: play.playerB, opponent: play.playerA };
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

