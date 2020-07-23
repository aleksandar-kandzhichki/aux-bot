import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { commandActions, CommandsContext } from "../../context/CommandContext";

const WatchPoll = () => {
    const { pollData } = useContext(CommandsContext);

    return (
        <div>
            {
                !!pollData ? Object.keys(pollData.data).map(key =>
                    <div>
                        <label>{key}</label> <span>{pollData.data[key]}</span>
                    </div>
                ) : ''
            }
        </div>
    );
};

export default WatchPoll;
