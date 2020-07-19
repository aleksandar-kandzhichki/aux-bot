import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { commandActions, CommandsContext } from "../../context/CommandContext";

const CommandAction = ({ commandName, actionName }) => {
    const { getCommand, currentCommand } = useContext(CommandsContext);
    useEffect(() => {
        getCommand(commandName, actionName);
        // eslint-disable-next-line
    }, [commandName, actionName]);

    return (
        <p>Data for <b>{currentCommand}</b>: </p>
    );
};

export default CommandAction;
