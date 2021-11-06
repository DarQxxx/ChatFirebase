import React, { useContext, useState } from 'react'
import AppContext from '../hooks/AppContext';
import { logout} from "../firebase"
import { Link } from 'react-router-dom';

export default function Header() {
    const [isLoggedIn, user] = useContext(AppContext);



    return (
    <div className="w-100 full-width-gradient d-flex align-items-center">
        <div className="container">
            <div className="color-white d-flex justify-content-end font-family-heebo ">
            {isLoggedIn? <div onClick={logout} className="pointer">Wyloguj</div> : <Link style={{textDecoration: "none", color: "white"}} to="/login"> Zaloguj</Link>}

            </div>
        </div>
    </div>
    )
}
