import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { commandActions, CommandsContext } from "../../context/CommandContext";
import { pollUpdate } from '../../ws.service'

const CommandAction = ({ commandName, actionName }) => {
    const { getCommand, currentCommand, commandData, executeCommand, currentAction, watchPoll } = useContext(CommandsContext);
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

        if (currentAction == "run")
            executeCommand(currentCommand, data);
        else if (currentAction == "watch")
            watchPoll(data.pollId);
        return false;
    }
    return (
        <form onSubmit={submitForm}>
            {(currentAction != "run" || !commandData || !commandData.params) ? '' :
                commandData.params.map(
                    p =>
                        <div className={'form-control'}>
                            <label>{p.name}</label>
                            <input type={p.type} defaultValue={p.default} name={p.name}></input>
                        </div>
                )}
            {
                (currentAction == "watch" && commandName == "poll") ? <input name="pollId" placeholder="Poll ID"></input> : ''
            }
            <button type="submit">{currentAction == "watch" ? "Warch" : "Run"}</button>
        </form>
        // <p>Data for <b>{commandData ? JSON.stringify(commandData) : 'unknown command'}</b>: </p>
    );
};

export default CommandAction;
