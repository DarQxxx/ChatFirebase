import React, { useRef, useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Friendlist from '../components/Friendlist'
import Msgboard from '../components/Msgboard'
import { getAnything, getMessagesWithFriend, time } from '../firebase'

export default function Chatwithfriends () {
  const params = useParams()
  const userProps = useSelector(state => state.userData)
  const isLogged = useSelector(state => state.isLogged)
  const messageInput = useRef()
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [fireBaseMessages, setFireBaseMessages] = useState([])
  const [firebaseFriendList, setFirebaseFriendList] = useState([])
  const msg1 = getMessagesWithFriend(userProps.uid, params.hisuid)
  const msg2 = getMessagesWithFriend(params.hisuid, userProps.uid)
  const [isLoading, setIsLoading] = useState(true)
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
    setIsLoading(false)
  }

  useEffect(() => {
    updateMessages()
    updateFriends()
  }, [params.hisuid, userProps.uid])

  function handleInput (e) {
    setMessage(messageInput.current.value)
  }

  function sendMessageWithEnter (e) {
    if (e.key === 'Enter' && message !== '') {
      msg1.add({
        text: message,
        createdAt: time(),
        uid: userProps.uid
      })

      if (userProps.uid !== params.hisuid) {
        msg2.add({
          text: message,
          createdAt: time(),
          uid: userProps.uid
        })
      }

      setChatMessages([...chatMessages, message])
      setMessage('')
      messageInput.current.value = ''
    }
  }

  function sendMessage (e) {
    if (message !== '') {
      msg1.add({
        text: message,
        createdAt: time(),
        uid: userProps.uid
      })
      setChatMessages([...chatMessages, message])
      setMessage('')
      messageInput.current.value = ''
    }
  }

    if (userProps.uid === null) {
      return <div>Jesteś zalogowany?</div>
    } else {
      return (
        <div className= "d-flex flex-column">
        <div className="d-flex">
            <Friendlist firebaseFriendList={firebaseFriendList} userProps={userProps} hisUid={params.hisuid} setIsLoading={setIsLoading} />
            <Msgboard fireBaseMessages={fireBaseMessages} userProps={userProps} />
        </div>
        <div>
              <div className='p-0 d-flex col-11 '>
                <input
                  type='text'
                  className='msg-field--textarea  msg-field--textarea-clear w-100'
                  placeholder='Aa'
                  onChange={handleInput}
                  onKeyDown={sendMessageWithEnter}
                  ref={messageInput}
                ></input>
                <a
                  href='#'
                  className=' border-left bg-info px-3 '
                  onClick={sendMessage}
                >
                  <i className='bi bi-shuffle'></i>
                </a>
              </div>
        </div>
        </div>
      )
    }
}
