import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { register } from '../firebase'

export default function Register () {
  const [isMatching, setIsMatching] = useState(null)
  const [errorStatus, setErrorStatus] = useState(false)
  const isLogged = useSelector(state => state.isLogged)
  const userProps = useSelector(state => state.userData)
  const [userData, setUserData] = useState({
    name: '',
    surname: '',

    email: '',
    passwd: '',
    passwdrepeat: ''
  })

  const [image, setImage] = useState(null)

  useEffect(() => {
    setIsMatching(true)
  }, [])
//Zmienianie danych użytkownika wraz z wpisywaniem przez niego infomracji
  const handleChange = e => {
    setUserData({ ...userData, [e.target.id]: e.target.value })
  }
//Rejestrowanie użytkownika podczas submitowania rejestracji
  const handleSubmit = e => {
    e.preventDefault()
    if (userData.passwd !== userData.passwdrepeat) {
      setIsMatching(false)
    } else
      register(
        userData.email,
        userData.passwd,
        image,
        userData.name,
        userData.surname,
        setErrorStatus
      )
  }
  //Zmiana avatara dodanego przez użytkownika
  const handleFileChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  if (userProps.uid === null && isLogged === false)
    return (
      <div className='container'>
        <div className='register'>
          {!isMatching && <div>Hasłą nie są takie same</div>}
          <form
            className='register__form d-flex flex-column text-center align-items-center'
            onSubmit={handleSubmit}
          >
            <label htmlFor='name' className='register__form--label pb-2 w-75'>
              Imię
            </label>
            <input
              type='text'
              id='name'
              className='mb-2 w-75 register__form--input'
              onChange={handleChange}
            ></input>
            <label
              htmlFor='surname'
              className='register__form--label pb-2 w-75'
            >
              Nazwisko
            </label>
            <input
              type='text'
              id='surname'
              className='mb-2 w-75 register__form--input'
              onChange={handleChange}
            ></input>
            <label htmlFor='email' className='register__form--label pb-2 w-75'>
              E-mail
            </label>
            <input
              type='email'
              id='email'
              className='mb-2 w-75 register__form--input'
              onChange={handleChange}
            ></input>
            <label htmlFor='passwd' className='register__form--label pb-2 w-75'>
              Hasło
            </label>
            <input
              type='password'
              id='passwd'
              className='mb-2 w-75 register__form--input'
              onChange={handleChange}
            ></input>
            <label
              htmlFor='passwdrepeat'
              className='register__form--label pb-2 w-75'
            >
              Powtórz hasło
            </label>
            <input
              type='password'
              id='passwdrepeat'
              className='mb-4 w-75 register__form--input'
              onChange={handleChange}
            ></input>

            <input
              type='file'
              id='file'
              onChange={handleFileChange}
              className='mb-3'
              style={{ color: 'white' }}
            />

            <input
              type='submit'
              className='register__form--btn'
              value='Zarejestruj się'
            ></input>
            <div className='login-register w-75 mt-3'>
              Posiadasz konto?{' '}
              <Link to='/login'>
                <span className='login-register--clickHere'>Zaloguj się</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  else {
    return <Redirect to={`/chat/${userProps.uid}`} />
  }
}
