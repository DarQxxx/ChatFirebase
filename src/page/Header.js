import React, { useState } from 'react'
import { Redirect } from 'react-router'

export default function Header() {
    const [isLogged, setIsLogged] = useState(false)

    function handleClick(){
        setIsLogged(!isLogged)
    }

    if (isLogged===true) return <Redirect to="/chat"></Redirect>

    return (
    <div className="w-100 full-width-gradient d-flex align-items-center">
        <div className="container">
            <div className="color-white d-flex justify-content-end font-family-heebo ">
                {isLogged? <div onClick={handleClick} className="pointer">Wyloguj</div> : <div onClick={handleClick} className="pointer"> Zaloguj</div>}
            </div>
        </div>
    </div>
    )
}
