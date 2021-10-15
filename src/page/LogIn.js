import React from 'react'
import { Link } from 'react-router-dom'

export default function LogIn() {
    return (
        <div className="container">
            <div class="login-box">
            <form className="login-form d-flex flex-column text-center align-items-center">
                <label for="email" className="login-labels pb-2">Wpisz swój e-mail</label>
                <input type="email" id="email" className="mb-4 w-50" ></input>
                <label for="email" id="passwd" className="login-labels pb-2">Wpisz swoje hasło</label>
                <input type="password" id="passwd" className="mb-4 w-50" ></input>
               <Link to="/chat"> <div className="login-button ">Zaloguj</div></Link>
            </form>
            </div>
        </div>
    )
}
