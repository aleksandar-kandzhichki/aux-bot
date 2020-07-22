import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { commandActions, CommandsContext } from "../../context/CommandContext";

const CommandAction = ({ pollId }) => {
    const { currentPoll } = useContext(CommandsContext);
    useEffect(() => {
        watchPoll(pollId)
        // eslint-disable-next-line
    }, [pollId]);

    return (
        <div>
            {
                currentPoll.map(el => {
                    <div>
                        <label>{el.name}</label> <span>{el.amount}</span>
                    </div>
                })
            }
        </div>
    );
};

export default CommandAction;
