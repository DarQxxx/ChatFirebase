import React, { useEffect, useRef, useState } from 'react'
import Chat from './page/Chat'
import LogIn from './page/LogIn'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


export default function App() {
  return (
    <Router>
      <Switch>
      <Route path="/chat" exact={true}>
        <Chat/>
      </Route>
      <Route path="/login" exact={true}>
        <LogIn/>
      </Route>
      </Switch>
    </Router>
 )
}

