import React from 'react';
import { useContext } from "react";
import { Link, Redirect } from 'react-router-dom';
import { UsersContext } from "../../context/UsersContext";

const Login = () => {
    const { login, currentUser, logout } = useContext(UsersContext);

    const submit = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const form = ev.currentTarget;
        const data = [...form.querySelectorAll("input")].reduce((acc, el) => { acc[el.name] = el.value; return acc }, {});

        login(data.email, data.password);
    }

    return (
        currentUser ?
            <div>
                <Redirect to="/profile"></Redirect>
                <h2>You are already logged in as <span>{currentUser.email}</span></h2>
                <Link to="../commands/all"><button>To Commands</button></Link>

                <button onClick={logout}> Logout </button>
            </div>

            :

            <form onSubmit={submit}>
                <input name="email"></input>
                <input name="password" type="password"></input>
                <button> Login </button>
            </form>
    )
}

export default Login;