import React from "react";
import { Typography, List, ListItem } from "@material-ui/core";
import styles from "../styles/Live.styles";
import { RpsItem, LiveProps } from "../typescript/types";
import { winner } from "../util/helpers";
import Emoji from "./Emoji";

const Live = (liveProps: LiveProps) => {
    const { onGoings, event, results } = liveProps;

    if (!event) return <Typography>Loading..</Typography>;

    return (
        <div style={styles.onGoingContainer}>
            <div style={{ width: "50%" }}>
                <Typography variant="h5" >Ongoing:</Typography>
                <List >
                    {
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
                            ? results.sort((a: RpsItem, b: RpsItem) => ((a.t as number) < (b.t as number)) ? 1 : -1).map((item: RpsItem) => {
                                const ago = parseFloat(((new Date().getTime() - (item?.t as number)) / 10000).toFixed(2));
                                const str = winner(item).result === "tie" ? "=" : winner(item).important.name === item.playerA.name ? ">" : "<";
                                return (
                                    <div key={item.gameId}>
                                        {
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