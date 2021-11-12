import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom'

import { getUsers, register } from '../firebase'
import AppContext from '../hooks/AppContext'

export default function Register() {
    const [userData, setUserData] = useState({
        email: "",
        passwd: "",
    })

    const handleChange = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value})
    }

    const handleSubmit =  (e) => {
        e.preventDefault();
        register(userData.email, userData.passwd);

        
    }


 


    return (
        <div className="container">
            <div className="login-box">
            <form className="login-form d-flex flex-column text-center align-items-center" onSubmit={handleSubmit}>
                <label htmlFor="email" className="login-labels pb-2 w-75">E-mail</label>
                <input type="email" id="email" className="mb-2 w-75 login-inputs" onChange={handleChange}></input>
                <label htmlFor="email" id="passwd" className="login-labels pb-2 w-75">Hasło</label>
                <input type="password" id="passwd" className="mb-4 w-75 login-inputs" onChange={handleChange}></input>
                <input type="submit" className="login-button"  value="Zarejestruj się" ></input>
               <div className="login-register w-75 mt-3">Posiadasz konto? <Link to="/login"><span className="login-register--clickHere">Zaloguj się</span></Link></div>
            </form>
            </div>
        </div>
    )
}
