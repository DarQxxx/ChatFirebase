import React from 'react'

export default function LogIn() {
    return (
        <div className="container login">
            <form className="login-form d-flex flex-column text-center align-items-center">
                <label for="email">Wpisz swój e-mail</label>
                <input type="email" id="email" className="w-25"></input>
                <label for="email" id="passwd">Wpisz swoje hasło</label>
                <input type="password" id="passwd" className="w-25"></input>
            </form>
        </div>
    )
}
