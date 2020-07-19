import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { commandActions, CommandsContext } from "../../context/CommandContext";

const ListActions = ({ commandName }) => {
    const { currentCommand, setCurrentAction, currentAction } = useContext(CommandsContext);
    return (
        <nav className="main-nav">
            <p>cur action: {currentAction}</p>
            <ul>
                <span className="command-name">{"<" + currentCommand + ">"}</span>
                {commandActions.map(c =>
                    <li><NavLink to={"/" + commandName + "/actions/" + c.name} key={"action-" + c.name} onClick={() => setCurrentAction(c.name)} >{c.displayName}</NavLink></li>
                )}
            </ul>
        </nav>
    );
};

export default ListActions;
