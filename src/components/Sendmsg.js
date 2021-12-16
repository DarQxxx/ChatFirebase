import React, { useRef, useState } from 'react'
import { getMessagesWithFriend, time } from '../firebase'

export default function Sendmsg (props) {
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const messageInput = useRef()
  const msg1 = getMessagesWithFriend(props.userProps.uid, props.hisUid)
  const msg2 = getMessagesWithFriend(props.hisUid, props.userProps.uid)

  //zmiana danych wpisywanych przez usera
  function handleInput (e) {
    setMessage(messageInput.current.value)
  }
  //Wysyłanie wiadomości przy naciśnięciu enteru
  function sendMessageWithEnter (e) {
    if (e.key === 'Enter' && message !== '') {
      msg1.add({
        text: message,
        createdAt: time(),
        uid: props.userProps.uid
      })

      if (props.userProps.uid !== props.hisUid) {
        msg2.add({
          text: message,
          createdAt: time(),
          uid: props.userProps.uid
        })
      }

      setChatMessages([...chatMessages, message])
      setMessage('')
      messageInput.current.value = ''
    }
  }
  //Wysyłka wiadomości poprzez guzik w czacie
  function sendMessage (e) {
    if (message !== '') {
      msg1.add({
        text: message,
        createdAt: time(),
        uid: props.userProps.uid
      })
      setChatMessages([...chatMessages, message])
      setMessage('')
      messageInput.current.value = ''
    }
  }

  return (
    <div className='p-0 d-flex  msgField'>
      <input
        type='text'
        className='msg-field--textarea  msg-field--textarea-clear w-100 '
        placeholder='Aa'
        onChange={handleInput}
        onKeyDown={sendMessageWithEnter}
        ref={messageInput}
      ></input>
      <a
        href='#'
        className=' border-left bg-info px-3 msg-field__sendBtn--radius'
        onClick={sendMessage}
      >
        <i className='bi bi-shuffle'></i>
      </a>
    </div>
  )
}
