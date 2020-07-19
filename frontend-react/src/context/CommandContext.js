import React, { createContext, useState } from "react";
export const CommandsContext = createContext();
export const availableCommands = [
    { name: "summary", displayName: "Summary" },
    { name: "poll", displayName: "Poll" },
    { name: "help", displayName: "Help" }
]

const CommandsContextProvider = props => {
    // const [availableCommands, setAvailableCommands] = useState([
    //     { name: "summary", displayName: "Summary" },
    //     { name: "poll", displayName: "Poll" },
    //     { name: "help", displayName: "Help" }
    // ]);
    return (
        <CommandsContext.Provider value={{}}>
            {props.children}
        </CommandsContext.Provider>
    );
};

export default CommandsContextProvider;
