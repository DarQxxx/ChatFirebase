import React from 'react'
import { Link } from 'react-router-dom'

export default function LogIn() {
    return (
        <div className="container">
            <div class="login-box">
            <form className="login-form d-flex flex-column text-center align-items-center">
                <label for="email" className="login-labels pb-2 w-75">E-mail</label>
                <input type="email" id="email" className="mb-2 w-75 login-inputs" ></input>
                <label for="email" id="passwd" className="login-labels pb-2 w-75">Hasło</label>
                <input type="password" id="passwd" className="mb-4 w-75 login-inputs" ></input>
               <Link to="/chat"> <div className="login-button">Zaloguj</div></Link>
               <div className="login-register w-75 mt-1">Nie posiadasz konta? <Link to="/chat"><span className="login-register--clickHere">Zarejestruj się</span></Link></div>
            </form>
            </div>
        </div>
    )
}
