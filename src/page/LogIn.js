import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../firebase'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

export default function LogIn () {
  const [errorStatus, setErrorStatus] = useState(false)
  const [userData, setUserData] = useState({
    email: '',
    passwd: ''
  })
  const isLogged = useSelector(state => state.isLogged)
  const userProps = useSelector(state => state.userData)

  //zmiana danych wpisywanych przez użytkownika
  const handleChange = e => {
    setUserData({ ...userData, [e.target.id]: e.target.value })
  }
  // zalogowanie jeśli formularz jest wypełniony poprawnie
  const handleSubmit = async e => {
    e.preventDefault()
    login(userData.email, userData.passwd, setErrorStatus)
  }

  if (userProps.uid === null && isLogged === false)
    return (
      <div className='container'>
        <div className='login-box'>
          <form
            className='login-form d-flex flex-column text-center align-items-center'
            onSubmit={handleSubmit}
          >
            {errorStatus !== null && (
              <div style={{ color: 'white' }}>{errorStatus}</div>
            )}
            <label htmlFor='email' className='login-labels pb-2 w-75'>
              E-mail
            </label>
            <input
              type='email'
              id='email'
              className='mb-2 w-75 login-inputs'
              onChange={handleChange}
            ></input>
            <label
              htmlFor='email'
              id='passwd'
              className='login-labels pb-2 w-75'
            >
              Hasło
            </label>
            <input
              type='password'
              id='passwd'
              className='mb-4 w-75 login-inputs'
              onChange={handleChange}
            ></input>
            <input
              type='submit'
              className='login-button'
              value='Zaloguj się'
            ></input>
            <div className='login-register w-75 mt-3'>
              Nie posiadasz konta?{' '}
              <Link to='/register'>
                <span className='login-register--clickHere'>
                  Zarejestruj się
                </span>
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
