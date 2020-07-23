import React, { createContext, useState } from "react";
import axios from "axios";

let savedUser = sessionStorage.getItem("user")
if (savedUser) savedUser = JSON.parse(savedUser)

const setBanner = (user) => {
    setTimeout(() => {
        if (user) {
            document.getElementById("user-banner").innerHTML = user.email;
            document.getElementById("user-banner").href = "/commands/all";
        }
        else {

            document.getElementById("user-banner").innerHTML = "Login";
            document.getElementById("user-banner").href = "/users/login";
        }
    }, 400)

}
setBanner(savedUser);

export const UsersContext = createContext();
const UsersContextProvider = props => {
    const [currentUser, setCurrentUser] = useState(savedUser);


    const saveUser = (user) => {
        sessionStorage.setItem("user", JSON.stringify(user));
        setBanner(user);
    }
    const login = (email, password) => {
        axios.post(`/api/users/login`, { email, password })
            .then(r => {
                const user = { ...r, email }
                setCurrentUser(user);
                saveUser(user);
            }).catch(e => console.error(e));
    }

    const register = (email, password) => {
        axios.post(`/api/users/register`, { email, password })
            .then(r => {
                const user = { ...r, email }
                setCurrentUser(user);
                saveUser(user);
            }).catch(e => console.error(e));
    }

    const logout = () => {
        setCurrentUser(undefined);
        saveUser(undefined);
    }

    return (
        <UsersContext.Provider value={{ currentUser, setCurrentUser, login, register, logout }}>
            {props.children}
        </UsersContext.Provider>
    );
};

export default UsersContextProvider;
