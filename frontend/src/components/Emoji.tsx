import React from "react";

const Emoji = ({ symbol }: {symbol: string}): JSX.Element => {

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