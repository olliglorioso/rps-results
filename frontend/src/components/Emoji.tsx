import React from "react";

// A small component that renders an emoji which is wanted.
const Emoji = ({ symbol }: {symbol: string}): JSX.Element => {
    // Based on the props.symbol, one of the three "available" emojis is returned. If the symbol
    // includes a ",", it is split and several emojis are returned.

    if (symbol.includes(",")) {
        return (
            <>{
                symbol.split(",").map((emoji: string) => {
                    return (
                        <span key={emoji} role={emoji}>
                            {emoji === "SCISSORS" ? String.fromCodePoint(0x270C) : emoji === "PAPER" ? String.fromCodePoint(0x1F91A) : String.fromCodePoint(0x1F44A)}
                        </span>
                    );
                })
            }</>
        );
    } else {
        return (
            <span
                role="img"
            >
                {symbol === "SCISSORS" ? String.fromCodePoint(0x270C) : symbol === "PAPER" ? String.fromCodePoint(0x1F91A) : String.fromCodePoint(0x1F44A)}
            </span>
        );}
};
export default Emoji;