import React from "react";
import { Typography, List, ListItem } from "@material-ui/core";
import styles from "../styles/Live.styles";
import { RpsItem, LiveProps } from "../typescript/types";
import { winner } from "../util/helpers";
import Emoji from "./Emoji";

// This component is responsible of rendering the live results and on going games.
const Live = (liveProps: LiveProps) => {
    // Destructuring the props.
    const { onGoings, event, results } = liveProps;

    // If there are no on going games or results, we return Loading...
    if (!event) return <Typography>Loading..</Typography>;

    // Return the component.
    return (
        <div style={styles.onGoingContainer}>
            <div style={{ width: "50%" }}>
                <Typography variant="h5" >Ongoing:</Typography>
                <List >
                    {
                    // If there are on going games, we render them.
                        onGoings
                            ? onGoings.map((item: RpsItem) => {
                                return (
                                    <div key={item.gameId} >
                                        {
                                            <ListItem style={styles.listItem} ><Typography>{item.playerA.name} vs {item.playerB.name}</Typography></ListItem>
                                        }
                                    </div>
                                );
                            })
                            : null
                    }
                </List>
            </div>
            <div style={styles.listContainer}>
                <Typography variant="h5">Results:</Typography>
                <List>
                    {
                        results
                        // If there are results, we render them.
                        // We sort them by their timestamp, so the most recent result is on top.
                            ? results.sort((a: RpsItem, b: RpsItem) => ((a.t as number) < (b.t as number)) ? 1 : -1).map((item: RpsItem) => {
                                // How much time has passed since the game ended.
                                const ago = parseFloat(((new Date().getTime() - (item?.t as number)) / 10000).toFixed(2));
                                // Creating a variable that holds either >, < or = depending on the winner.
                                const str = winner(item).result === "tie" ? "=" : winner(item).important.name === item.playerA.name ? ">" : "<";
                                return (
                                    <div key={item.gameId}>
                                        {
                                            // We show the result only if it is published less than 7 seconds ago.
                                            ago < 7
                                                ? <ListItem style={styles.listItem} ><Typography>{item.playerA.name} <Emoji symbol={item.playerA.played} /> {str} {item.playerB.name} <Emoji symbol={item.playerB.played} /> ({ago}s ago)</Typography></ListItem>
                                                : null
                                        }
                                    </div>
                                );
                            })
                            : null
                    }
                </List>
            </div>
        </div>
    );
};

export default Live;