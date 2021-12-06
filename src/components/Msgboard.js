import React from 'react'

export default function Msgboard(props) {
    return (
        <div className=' text-center col-11 p-0 back'>
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
                  src={props.userProps.url}
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
    )
}
