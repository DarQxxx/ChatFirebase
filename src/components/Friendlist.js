import React from 'react'
import { Link } from 'react-router-dom'

export default function Friendlist(props) {
    console.log("gdzie sa przyjaciele hagrida")
    return (
        <div className='col-1 p-0 friendsList'>
        {props.firebaseFriendList.map((friends, index) => (
          <div>
            {friends.uid !== props.userProps.uid && (
              <div>
                {friends.uid === props.hisUid ? (
                  <div key={index}>
                    {' '}
                    <div
                      className='text-center pt-3'
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        className='friends-img'
                        src={friends.url}
                        alt=''
                      />
                    </div>
                  </div>
                ) : (
                  <Link
                    key={index}

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
    )
}
