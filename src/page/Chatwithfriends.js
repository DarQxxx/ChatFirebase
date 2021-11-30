import React, { useRef, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getAnything, getMessagesWithFriend, time } from '../firebase'
import AppContext from '../hooks/AppContext'
export default function Chatwithfriends () {
  const params = useParams()
  const messageInput = useRef()
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [fireBaseMessages, setFireBaseMessages] = useState([])
  const [firebaseFriendList, setFirebaseFriendList] = useState([])
  const [profileImage, setProfileImage] = useState(null)
  const [myuid, setMyuid] = useState(null)
  const msg1 = getMessagesWithFriend(myuid, params.hisuid)
  const msg2 = getMessagesWithFriend(params.hisuid, myuid)
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

  console.log(params)

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('authUser')) !== null)
      setMyuid(JSON.parse(localStorage.getItem('authUser')).uid)
  }, [JSON.parse(localStorage.getItem('authUser'))])

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
    getAnything('users')
      .doc(params.hisuid)
      .onSnapshot(doc => {
        setProfileImage(doc.data().url)
      })
    updateMessages()
    updateFriends()
  }, [params.hisuid, myuid])

  function handleInput (e) {
    setMessage(messageInput.current.value)
  }

  function sendMessageWithEnter (e) {
    if (e.key === 'Enter' && message !== '') {
      msg1.add({
        text: message,
        createdAt: time(),
        uid: myuid
      })

      if (myuid !== params.hisuid) {
        msg2.add({
          text: message,
          createdAt: time(),
          uid: myuid
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
        uid: myuid
      })
      setChatMessages([...chatMessages, message])
      setMessage('')
      messageInput.current.value = ''
    }
  }

  if (isLoading === true) {
    return <div>Ładowanie</div>
  } else {
    if (myuid === null) {
      return <div>Jesteś zalogowany?</div>
    } else {
      return (
        <div>
          <div className='container'>
            <div className='row '>
              <div className='col-1 p-0'>
                {firebaseFriendList.map((friends, index) => (
                  <div>
                    {friends.uid !== myuid && (
                      <div>
                        {friends.uid === params.hisuid ? (
                          <div key={index}>                            <div className='text-center pt-3' style={{cursor: "pointer"}}>
                          <img
                            className='friends-img'
                            src={friends.url}
                            alt=''
                          />
                        </div></div>
                        ) : (
                          <Link
                            key={index}
                            onClick={() => {
                              setIsLoading(true)
                            }}
                            to={`/chat/${friends.uid}`}
                          >
                            <div className='text-center pt-3'>
                              <img
                                className='friends-img'
                                src={friends.url}
                                alt=''
                              />
                            </div>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className=' text-center col-11 p-0 back'>
                {/*   {chatMessages.map((message, index)=> (<div className="messages-every messages-my" key={index}><div className="message-direct message-direct-my">{message}</div></div>))} */}
                {fireBaseMessages.map((msg, index) => (
                  <div key={index}>
                    {msg.uid === myuid ? (
                      <div className='messages-every messages-my' key={msg.id}>
                        <p className='message-direct message-direct-my'>
                          {msg.text}
                        </p>
                      </div>
                    ) : (
                      <div className='messages-every messages-his' key={msg.id}>
                        <img
                          className='message-direct-his-img'
                          src={profileImage}
                          alt='niemaimg'
                        />
                        <p className='message-direct message-direct-his'>
                          {msg.text}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className='row '>
              <div className='col-1'></div>
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
        </div>
      )
    }
  }
}
