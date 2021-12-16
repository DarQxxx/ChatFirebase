import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './page/Header'

import firebase from 'firebase/compat'
import paths from './page/paths'
import { useDispatch } from 'react-redux'
import { getAnything } from './firebase'
import { dataAction, loginAction, logoutAction } from './actions'

export default function App () {
  const dispatch = useDispatch()
  //const userProps = useSelector(state => state.userData)
  //const isLogged = useSelector(state => state.isLogged)
  //const isSigningUp = useSelector(state => state.signUp)
  const [isLoading, setIsLoading] = useState(true)

  //Funkcja, która nasłuchuje zmianę statusu logowania użytkownika i nadawanie informacji Reduxowej czy użytkownik jest zalogowany oraz jaki użytkownik / wylogowanie użytkownika i wyzerowanie danych reduxowych
  function authChange () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        getAnything('users')
          .doc(user.uid)
          .onSnapshot(doc => {
            if (typeof doc.data() !== 'undefined') {
              if (
                typeof doc.data().name !== 'undefined' &&
                typeof doc.data().surname !== 'undefined' &&
                typeof doc.data().uid !== 'undefined' &&
                typeof doc.data().url !== 'undefined'
              ) {
                dispatch(
                  dataAction({
                    name: doc.data().name,
                    surname: doc.data().surname,
                    uid: doc.data().uid,
                    profilePic: doc.data().url
                  })
                )
                dispatch(loginAction())
              }
              setIsLoading(false)
            }
          })
      } else {
        dispatch(
          dataAction({ name: null, surname: null, uid: null, profilePic: null })
        )
        dispatch(logoutAction())
        setIsLoading(false)
      }
    })
  }

  useEffect(() => {
    authChange()
  }, [])

  if (isLoading === true) return <div>LOADING</div>
  else
    return (
      <Router>
        <Switch>
          {paths.map((route, index) => {
            if (route.path === '/chat/:id') {
              return (
                <Route index={index} path={route.path} exact={route.exact}>
                  <Header bg={1} /> {route.component}{' '}
                </Route>
              )
            }

            if (route.path === '/') {
              return (
                <Route index={index} path={route.path} exact={route.exact}>
                  <Header bg={0} /> {route.component}{' '}
                </Route>
              )
            }

            return (
              <Route index={index} path={route.path} exact={route.exact}>
                <Header bg={1} /> {route.component}{' '}
              </Route>
            )
          })}
        </Switch>
      </Router>
    )
}
