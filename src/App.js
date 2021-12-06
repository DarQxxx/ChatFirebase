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




  function authChange(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        localStorage.setItem('authUser', JSON.stringify(user))
      getAnything('users')
        .doc(user.uid).onSnapshot(doc => {

          /*if(typeof doc.data().name !== "undefined" && typeof  doc.data().surname !== "undefined" && typeof doc.data().uid !== "undefined" && typeof  doc.data().url !== "undefined"){
            dispatch(dataAction({name: doc.data().name, surname: doc.data().surname, uid: doc.data().uid, profilePic: doc.data().url}));
            dispatch(loginAction())
          }
        else{
            setTimeout(waitForElement, 250);
        }*/
        if (typeof doc.data() !== "undefined"){
          if (typeof doc.data().name !== "undefined" && typeof doc.data().surname !== "undefined" && typeof doc.data().uid !== "undefined" && typeof doc.data().url !== "undefined" ){
        dispatch(dataAction({name: doc.data().name, surname: doc.data().surname, uid: doc.data().uid, profilePic: doc.data().url}));
        dispatch(loginAction())
          }
        }


          
        })
        
      }
      else {
        dispatch(dataAction({name: null, surname: null, uid: null, profilePic: null}));
        dispatch(logoutAction());
        localStorage.removeItem('authUser')

      }
    })
  }

  

  useEffect(() => {
    authChange();
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

