import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { commandActions, CommandsContext } from "../../context/CommandContext";

const CommandAction = ({ commandName, actionName }) => {
    const { getCommand, currentCommand, commandData, executeCommand } = useContext(CommandsContext);
    useEffect(() => {
        getCommand(commandName, actionName);
        // eslint-disable-next-line
    }, [commandName, actionName]);

    const formData = {}
    const submitForm = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const form = ev.currentTarget;
        const data = [...form.querySelectorAll("input")].reduce((acc, el) => { acc[el.name] = el.value; return acc }, {});

        executeCommand(data);
        return false;
    }
    const test = (...args) => {
        console.log(args);
    }
    return (
        <form onSubmit={submitForm} onChange={test}>
            {(!commandData || !commandData.params) ? '' :
                commandData.params.map(
                    p =>
                        <div className={'form-control'}>
                            <label>{p.name}</label>
                            <input type={p.type} defaultValue={p.default} name={p.name}></input>
                        </div>
                )}
            <button type="submit">Run</button>
        </form>
        // <p>Data for <b>{commandData ? JSON.stringify(commandData) : 'unknown command'}</b>: </p>
    );
};

export default CommandAction;
