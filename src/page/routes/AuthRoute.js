import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'


export default function AuthRoute(props) {
    const isLogged = useSelector(state => state.isLogged)
    
    if(isLogged === true) return <Route  {...props}/>

    return <Redirect to="/login" />
}
