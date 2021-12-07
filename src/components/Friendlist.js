import React from 'react'
import { Link } from 'react-router-dom'

export default function Friendlist(props) {
    return (
        <div className='  friendsList'>
        {props.firebaseFriendList.map((friends, index) => (
          <div>
            {friends.uid !== props.userProps.uid && (
              <div>
                {friends.uid === props.hisUid ? (
                  <div key={index}>
                    {' '}
                    <div
                      className=' friendsList__friend--position friendsList__friend'
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        className='friends-img'
                        src={friends.url}
                        alt=''
                      />
                      <div className="friendsList__friend__name friendsList__friend__name--margin">{friends.name} {friends.surname}</div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={index}

                    to={`/chat/${friends.uid}`}
                  >
                    <div className=' friendsList__friend--position friendsList__friend '>
                      <img
                        className='friends-img'
                        src={friends.url}
                        alt=''
                      />
                      <div className="friendsList__friend__name friendsList__friend__name--margin" >{friends.name} {friends.surname}</div>
                    </div>
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    )
}
