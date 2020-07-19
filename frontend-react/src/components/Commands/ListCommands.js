import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CommandsContext } from "../../context/CommandContext";

const ListCommands = () => {
    const { availableCommands, currentCommand } = useContext(CommandsContext);

    return (
        <nav className="main-nav">
            <ul>
                <li><NavLink to="all">All</NavLink></li>
                {availableCommands.map(c =>
                    <li><NavLink className={currentCommand == c.name ? 'active' : ''} to={"/" + c.name} key={c.name}>{c.displayName}</NavLink></li>
                )}
            </ul>
        </nav>
    );
};

export default ListCommands;
