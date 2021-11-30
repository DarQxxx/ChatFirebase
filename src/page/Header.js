import React, { useContext } from 'react'
import AppContext from '../hooks/AppContext'
import { getAnything, logout } from '../firebase'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

export default function Header (props) {
    const [name, setName] = useState(null)
  const [isLoggedIn] = useContext(AppContext)
  const [profileImage, setProfileImage] = useState(null)
  const [isMenu, setIsMenu] = useState(false)
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('authUser')) !== null){
      getAnything('users')
        .doc(JSON.parse(localStorage.getItem('authUser')).uid)
        .onSnapshot(doc => {
          setProfileImage(doc.data().url)
        })
        setName(JSON.parse(localStorage.getItem('authUser')).email)
    }
  }, [])

  function handleMenuClick () {
    setIsMenu(!isMenu);
  }

  return (
    <div>
      {props.bg === 0 ? (
        <div className='w-100 transparent-bg d-flex align-items-center'>
          <div className='container'>
            <div className='color-white d-flex justify-content-end font-family-heebo '>
              {isLoggedIn ? (
                <div>
                  <Link onClick={logout} to='/login'>
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
              {isLoggedIn ? (
                <div>
                  <div className='d-flex align-items-center'>
                    <div className='profileImage d-flex'>
                      <img
                        className='profileImage__element'
                        src={profileImage}
                      />
                      <div className='profileImage__name align-middle'>
                        {name}
                      </div>
                    </div>
                    <div className='options d-flex' onClick={handleMenuClick}>
                      <FaChevronDown />
                    </div>
                  </div>
                  {isMenu&& (                  <div className='menu position-absolute d-flex flex-column'>
                    <div className='menu__element'>Profile</div>
                    <div className='menu__element'>Settings</div>
                    <div className='menu__element'>
                      <Link onClick={logout} to='/login'>
                        Wyloguj
                      </Link>
                    </div>
                  </div>) }

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
