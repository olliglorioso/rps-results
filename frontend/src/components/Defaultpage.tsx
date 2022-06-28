import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import History from "./History";
import Live from "./Live";
import { RpsItem } from "../typescript/types";
import styles from "../styles/Defaultpage.style";

const Defaultpage = (): JSX.Element => {
    const [onGoings, setOnGoings] = useState<RpsItem[]>([]);
    const [event, setEvent] = useState<string>();
    const [results, setResults] = useState<RpsItem[]>([]);

    useEffect(() => {
        if (event) {
            const newEvent = JSON.parse(event);
            if (newEvent.type === "GAME_BEGIN") {
                setOnGoings([...onGoings, newEvent]);
            } else {
                setResults([newEvent, ...results]);
                setOnGoings(onGoings.filter(item => item.gameId !== newEvent.gameId));
            }
        }
    }, [event]);

    useEffect(() => {
        ws.onmessage = (message) => {
            setEvent(JSON.parse(message.data).toString());
        };
    }, []);

    return (
        <div>
            <Card>
                <CardContent style={styles.cardContentLive}>
                    <Typography variant="h4">Live results</Typography>
                    <Live onGoings={onGoings} results={results} event={event} />
                </CardContent>
            </Card>
            <p></p>
            <Card>
                <CardContent style={styles.cardContentHistory}>
                    <Typography variant="h4" style={{ textAlign: "center" }}>History</Typography>
                    <History results={results} />
                </CardContent>
            </Card>
        </div>
    );
};

export default Defaultpage;