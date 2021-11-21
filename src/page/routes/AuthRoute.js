import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import AppContext from '../../hooks/AppContext'

export default function AuthRoute(props) {
    const [isLoggedIn] = useContext(AppContext)
    
    if(JSON.parse(localStorage.getItem('authUser')) !== null) return <Route  {...props}/>

    return <Redirect to="/login" />
}
