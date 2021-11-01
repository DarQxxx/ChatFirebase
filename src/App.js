import React, { useEffect, useRef, useState } from 'react'
import Chat from './page/Chat'
import LogIn from './page/LogIn'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './page/Register';
import Header from './page/Header';


export default function App() {
  return (
    <Router>
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
    </Router>
 )
}

