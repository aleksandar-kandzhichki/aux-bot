import React, { createContext, useState } from "react";

export const UsersContext = createContext();
const UsersContextProvider = props => {

    const [currentUser, setCurrentUser] = useState(undefined);

    return (
        <UsersContext.Provider value={{ currentUser, setCurrentUser }}>
            {props.children}
        </UsersContext.Provider>
    );
};

export default UsersContextProvider;
