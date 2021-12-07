import React, { useRef, useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Friendlist from '../components/Friendlist'
import Msgboard from '../components/Msgboard'
import Sendmsg from '../components/Sendmsg'
import { getAnything, getMessagesWithFriend, time } from '../firebase'

export default function Chatwithfriends () {
  const params = useParams()
  const userProps = useSelector(state => state.userData)
  const isLogged = useSelector(state => state.isLogged)


  const [fireBaseMessages, setFireBaseMessages] = useState([])
  const [firebaseFriendList, setFirebaseFriendList] = useState([])
  const msg1 = getMessagesWithFriend(userProps.uid, params.hisuid)
  const msg2 = getMessagesWithFriend(params.hisuid, userProps.uid)
  function updateMessages () {
    msg1.orderBy('createdAt').onSnapshot(querySnapshot => {
      const items = []
      querySnapshot.forEach(doc => {
        items.push(doc.data())
      })
      setFireBaseMessages(items)
    })
  }





  function updateFriends () {
    getAnything('users').onSnapshot(querySnapshot => {
      const items = []
      querySnapshot.forEach(doc => {
        items.push(doc.data())
      })
      setFirebaseFriendList(items)
    })
  }

  useEffect(() => {
    updateMessages()
    updateFriends()
  }, [params.hisuid, userProps.uid])


    if (userProps.uid === null) {
      return <div>Jesteś zalogowany?</div>
    } else {
      return (
        <div className="d-flex">
            <Friendlist firebaseFriendList={firebaseFriendList} userProps={userProps} hisUid={params.hisuid}  />
            <Msgboard fireBaseMessages={fireBaseMessages} userProps={userProps} hisUid={params.hisuid} />
        </div>
      )
    }
}
