import React, { useRef } from 'react'
import { logout } from '../firebase'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'

export default function Header (props) {
  const isLogged = useSelector(state => state.isLogged)

  const [isMenu, setIsMenu] = useState(false)
  const userProps = useSelector(state => state.userData)
  const clickMenu = useRef()
  //Włączanie i wyłączanie menu 
  function handleMenuClick () {
    setIsMenu(!isMenu)
  }

  return (
    <div>
      {props.bg === 0 ? (
        <div className='w-100 transparent-bg d-flex align-items-center'>
          <div className='container'>
            <div className='color-white d-flex justify-content-end font-family-heebo '>
              {isLogged ? (
                <div>
                  <Link onClick={logout} to='/'>
                    Wyloguj
                  </Link>
                </div>
              ) : (
                <Link to='/login'> Zaloguj</Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='w-100 full-width-gradient d-flex align-items-center'>
          <div className='container'>
            <div className='color-white d-flex justify-content-end font-family-heebo '>
              {isLogged ? (
                <div>
                  <div className='d-flex align-items-center'>
                    <div className='profileImage d-flex'>
                      <img
                        className='profileImage__element'
                        src={userProps.profilePic}
                      />
                      <div className='profileImage__name align-middle'>
                        {`${userProps.name} ${userProps.surname}`}
                      </div>
                    </div>
                    <div
                      className='options d-flex'
                      onClick={handleMenuClick}
                      ref={clickMenu}
                    >
                      <FaChevronDown />
                    </div>
                  </div>
                  {isMenu && (
                    <Navbar
                      setIsMenu={setIsMenu}
                      clickMenu={clickMenu}
                      userProps={userProps}
                    ></Navbar>
                  )}
                </div>
              ) : (
                <Link to='/login'> Zaloguj</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
