import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './page/Header';

import firebase from "firebase/compat";
import paths from './page/paths';
import AuthRoute from './page/routes/AuthRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getAnything } from './firebase';
import { dataAction, loginAction, logoutAction } from './actions';


export default function App() {
  
  const dispatch = useDispatch();
  const userProps = useSelector(state => state.userData)
  const isLogged = useSelector(state => state.isLogged)
  const isSigningUp = useSelector(state => state.signUp)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        localStorage.setItem('authUser', JSON.stringify(user))
      getAnything('users')
        .doc(user.uid).onSnapshot(doc => {
          dispatch(dataAction({name: doc.data().name, surname: doc.data().surname, uid: doc.data().uid, profilePic: doc.data().url}));
          dispatch(loginAction())

          
        })
        console.log("uzyl sie if")
        
      }
      else {
        dispatch(dataAction({name: null, surname: null, uid: null, profilePic: null}));
        dispatch(logoutAction());
        localStorage.removeItem('authUser')
        console.log("uzyl sie else")

      }
    })
  }, [])    



  


 

  

  return (
    <Router>

        
        <Switch>
          {paths.map((route, index) => {
            
            if (route.path === "/chat/:id"){
              return  (<AuthRoute index = {index} path = {route.path} exact={route.exact}> 
                <Header bg={1}/> {route.component} </AuthRoute>)
            }

            if (route.path === "/"){
              return  (<Route index = {index} path = {route.path} exact={route.exact}> 
                <Header bg={0}/> {route.component}  </Route>)
            }

            return (<Route index = {index} path = {route.path} exact={route.exact}> 
            <Header bg={1}/> {route.component} </Route>)})}
        </Switch>

    </Router>
 )
}

