import React from 'react';
import { useContext } from "react";
import { Link, useHistory } from 'react-router-dom';
import { UsersContext } from "../../context/UsersContext";

const Profile = () => {
    const { currentUser, logout } = useContext(UsersContext);
    const history = useHistory();

    const toCommands = () => {
        window.location.replace("/commands/all")
    }

    return (
        !currentUser ?
            <Link to="/login"> Login </Link>

            :

            <div>
                <p>{currentUser.email}</p>
                <button onClick={toCommands}>To Commands</button>

                <button onClick={logout}> Logout </button>
            </div>
    )
}

export default Profile;