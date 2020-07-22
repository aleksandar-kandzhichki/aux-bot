import React, { createContext, useState } from "react";
import axios from "axios";
import { pollUpdate, watchPollUpdates } from '../ws.service'

export const CommandsContext = createContext();
export const commandActions = [
    { name: "run", displayName: "Run" },
    { name: "watch", displayName: "Watch" },
    { name: "schedule", displayName: "Schedule" },
    { name: "help", displayName: "Help" }
]

const CommandsContextProvider = props => {
    const [availableCommands, setAvailableCommands] = useState([
        { name: "summary", displayName: "Summary" },
        { name: "poll", displayName: "Poll" },
        { name: "help", displayName: "Help" }
    ]);
    const [commandData, setCommandData] = useState({})

    const [loading, setLoading] = useState(false);
    const [currentCommand, setCurrentCommand] = useState("all");
    const [currentAction, setCurrentAction] = useState(undefined);
    const [pollData, setPollData] = useState({});

    const searchWatchCommand = query => {
        axios
            .get(
                `https://api/commands/watch`
            )
            .then(response => {
                setAvailableCommands(response.data.commands);
                setLoading(false);
            })
            .catch(error => {
                console.log(
                    "Encountered an error with fetching and parsing data",
                    error
                );
            });
    };

    const getCommand = (commandName, commandAction) => {
        axios.get(`/api/commands/${commandName}/actions/${commandAction}`)
            .then(r => {
                setCommandData(r.data[0]);
                setLoading(false)
            }).catch(e => console.error(e));
    }

    const executeCommand = (commandName, data) => {
        axios.post(`/api/commands/${commandName}/actions/run`, data)
            .then(r => {
                setLoading(false)
            }).catch(e => console.error(e));
    }

    const watchPoll = (pollId) => {
        watchPollUpdates(pollId);

        pollUpdate.subscribe(data => {
            setPollData(data);
        })
    }

    return (
        <CommandsContext.Provider value={{ availableCommands, loading, searchWatchCommand, currentCommand, setCurrentCommand, getCommand, currentAction, setCurrentAction, commandData, executeCommand, watchPoll }}>
            {props.children}
        </CommandsContext.Provider>
    );
};

export default CommandsContextProvider;
