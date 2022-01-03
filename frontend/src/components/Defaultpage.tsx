import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import History from "./History";
import Live from "./Live";
import { RpsItem } from "../typescript/types";
import styles from "../styles/Defaultpage.style";

// This renders all the other components. It handle the general state of the app.
const Defaultpage = (): JSX.Element => {
    // State that has ongoing games.
    const [onGoings, setOnGoings] = useState<RpsItem[]>([]);
    // State that has events from the websocket.
    const [event, setEvent] = useState<string>();
    // State that has recently finished games.
    const [results, setResults] = useState<RpsItem[]>([]);

    // This useEffect is called always when a new event is received from the websocket,
    // hence a new game has started or a game has finished.
    useEffect(() => {
        // If event exists, we parse it to JSON-format. If its type is GAME_BEGIN,
        // we add it to the ongoing games. If its type is GAME_END, we add it to the
        // recently finished games and remove it from the ongoing games.
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

    // This useEffect is called when the component is mounted.
    useEffect(() => {
        // We create a websocket connection.
        const ws = new WebSocket("wss://bad-api-assignment.reaktor.com/rps/live");
        // When a new event is received, we set the event state and this calls the other useEffect in this component.
        ws.onmessage = (message) => {
            setEvent(JSON.parse(message.data).toString());
        };
    }, []);

    // Return this component, it contains all the other components.
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