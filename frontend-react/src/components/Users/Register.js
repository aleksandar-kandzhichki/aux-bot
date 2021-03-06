import React from 'react';
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";

const Register = () => {
    const { register, currentUser } = useContext(UsersContext);

    const submit = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const form = ev.currentTarget;
        const data = [...form.querySelectorAll("input")].reduce((acc, el) => { acc[el.name] = el.value; return acc }, {});

        register(data.email, data.password);
    }

    return (
        currentUser ?
            <h2>You are already logged in as <span>{currentUser.email}</span></h2>

            :

            <form onSubmit={submit}>
                <label>Email</label>
                <input name="email"></input>

                <label>Password</label>
                <input name="password" type="password"></input>

                <label>Repeat password</label>
                <input name="confirmPassword" type="password"></input>
                <button> Register </button>
            </form>
    )
}

export default Register;