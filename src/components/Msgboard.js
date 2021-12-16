import React, { useEffect, useRef, useState } from 'react'
import { getAnything, getMessagesWithFriend } from '../firebase'
import Chatheader from './Chatheader'
import Sendmsg from './Sendmsg'

export default function Msgboard (props) {
  const [FriendImg, setFriendImg] = useState(null)
  const scrollDown = useRef()
  const scrollRef = useRef()
  const [goDown, setGoDown] = useState(false)
  const [isLoading, setIsLoading] = useState({ loading1: true, loading2: true })

  const [fireBaseMessages, setFireBaseMessages] = useState([])
  const msg1 = getMessagesWithFriend(props.userProps.uid, props.hisUid)
  //Przy zmianie użytkownika z którym rozmawiamy zerujemy loadingi, tablice z danymi.
  useEffect(() => {
    setIsLoading({ loading1: true, loading2: true })
    setFireBaseMessages([])
    setFriendImg(null)
    getAnything('users')
      .doc(props.hisUid)
      .onSnapshot(doc => {
        setFriendImg(doc.data().url)
        setIsLoading({ loading1: isLoading.loading1, loading2: false })
      })
      // Scrollowanie czatu na dół w momencie włączenia czatu. 
    scrollDown.current.scrollIntoView()
      //Ściąganie wiadomości z użytkownikiem
    const updateMessages = msg1
      .orderBy('createdAt')
      .onSnapshot(querySnapshot => {
        const items = []
        querySnapshot.forEach(doc => {
          items.push(doc.data())
        })

        setGoDown(true)
        setFireBaseMessages(items)
        setIsLoading({ loading1: false, loading2: isLoading.loading2 })
      })
      // Wyłączenie nasłuchiwania wiadomości z konkretnym użytkownikiem
    return () => {
      updateMessages()
    }
  }, [props.hisUid, props.userProps.uid])
  //Scrollowanie czatu w dół przy zmianie state "goDown"
  useEffect(() => {
    scrollDown.current.scrollIntoView()
    setGoDown(false)
  }, [goDown])


  if (isLoading.loading1 === true && isLoading.loading2 === true)
    return (
      <div className='w-100 '>
        <Chatheader friendImg={FriendImg} />
        <div
          ref={scrollRef}
          className=' text-center   back'
        >
          <div ref={scrollDown}></div>
        </div>
        <Sendmsg
          userProps={props.userProps}
          hisUid={props.hisUid}
          scrollDown={scrollDown}
        />
      </div>
    )
  else
    return (
      <div className='w-100 '>
        <Chatheader friendImg={FriendImg} />
        <div
          ref={scrollRef}
          className=' text-center   back'
        >
          {fireBaseMessages.map((msg, index) => (
            <div key={index}>
              {msg.uid === props.userProps.uid ? (
                <div className='messages-every messages-my' key={msg.id}>
                  <p className='message-direct message-direct-my'>{msg.text}</p>
                </div>
              ) : (
                <div className='messages-every messages-his' key={msg.id}>
                  <img
                    className='message-direct-his-img'
                    src={FriendImg}
                    alt='niemaimg'
                  />
                  <p className='message-direct message-direct-his'>
                    {msg.text}
                  </p>
                </div>
              )}
            </div>
          ))}
          <div ref={scrollDown}></div>
        </div>
        <Sendmsg
          userProps={props.userProps}
          hisUid={props.hisUid}
          scrollDown={scrollDown}
        />
      </div>
    )
}
