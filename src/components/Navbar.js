import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../firebase'

export default function Navbar(props) {

    const navRef = useRef(null)

    function handleClickOutside(e) {

        if (!props.clickMenu.current.contains(e.target))
        if (!navRef.current.contains(e.target)) props.setIsMenu(false)
    }

    function handleClick(){
        props.setIsMenu(false)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    }, [])

    return (
        <div className='menu position-absolute d-flex flex-column' ref ={navRef}>
                    <div className='menu__element' onClick={handleClick}>Profile</div>
                    <div className='menu__element' onClick={handleClick}>Settings</div>
                    <div className='menu__element'>
                      <Link onClick={() => {handleClick(); logout()}} to='/'>
                        Wyloguj
                      </Link>
                    </div>
                  </div>
    )
}
