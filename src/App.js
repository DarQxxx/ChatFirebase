import React, { useEffect, useState } from 'react'
import Chat from './page/Chat'
import LogIn from './page/LogIn'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './page/Register';
import Header from './page/Header';
import AppContext from './hooks/AppContext';
import { stateChanged } from './firebase';
import {initializeApp} from "firebase/app"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import firebase from "firebase/compat";


export default function App() {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState(null)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        setIsLogged(true);
        setUser(user);
        console.log(user);
      }
      else {
        setUser({})
        setIsLogged(false)
        console.log(user);
      }
    })
  }, [])

  

  return (
    <Router>
      <AppContext.Provider value={[isLogged, user]}>

        <Header/>
        <Switch>
        <Route path="/chat">
          <Chat/>
        </Route>
        <Route path="/login" exact={true}>
          <LogIn/>
        </Route>
        <Route path="/signin" exact={true}>
          <Register/>
        </Route>
        </Switch>
      </AppContext.Provider>

    </Router>
 )
}

