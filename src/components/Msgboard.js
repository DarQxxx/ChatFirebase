import React, { useEffect, useState } from 'react'
import { getAnything } from '../firebase'
import Sendmsg from './Sendmsg'

export default function Msgboard(props) {
    const [FriendImg, setFriendImg] = useState(null)

    useEffect(() => {
        getAnything('users')
          .doc(props.hisUid)
          .onSnapshot(doc => {
            setFriendImg(doc.data().url)
          })
          console.log("zmieniam sie")
      }, [props.hisUid, props.userProps.uid])

    return (
        <div className="w-100 ">
        <div className=' text-center  p-0 back'>
        {/*   {chatMessages.map((message, index)=> (<div className="messages-every messages-my" key={index}><div className="message-direct message-direct-my">{message}</div></div>))} */}
        {props.fireBaseMessages.map((msg, index) => (
          <div key={index}>
            {msg.uid === props.userProps.uid ? (
              <div className='messages-every messages-my' key={msg.id}>
                <p className='message-direct message-direct-my'>
                  {msg.text}
                </p>
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


      </div>
      <Sendmsg userProps={props.userProps} hisUid={props.hisUid}/>

      </div>
      
      
    )
}
