import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './page/Header';
import AppContext from './hooks/AppContext';
import firebase from "firebase/compat";
import paths from './page/paths';
import AuthRoute from './page/routes/AuthRoute';


export default function App() {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState(null)
  const [uid, setUid] = useState(null)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        setIsLogged(true);
        setUser(user);
        setUid(user.uid)
      }
      else {
        setUser({})
        setIsLogged(false)
        setUid(null);
      }
    })
  }, [])

  

  return (
    <Router>
      <AppContext.Provider value={[isLogged, user, uid]}>

        <Header/>
        <Switch>
          {paths.map((route, index) => {
            
            if (route.path === "/chat"){
              return  (<AuthRoute index = {index} path = {route.path} exact={route.exact}> 
                {route.component} </AuthRoute>)
            }

            return (<Route index = {index} path = {route.path} exact={route.exact}> 
            {route.component} </Route>)})}
        </Switch>
      </AppContext.Provider>

    </Router>
 )
}

