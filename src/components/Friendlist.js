import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { getAnything } from '../firebase'

export default function Friendlist (props) {
  const [firebaseFriendList, setFirebaseFriendList] = useState([])
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
//Funkcja, która ściąga dane userów z bazy danych
  function updateFriends () {
    getAnything('users').onSnapshot(querySnapshot => {
      const items = []
      querySnapshot.forEach(doc => {
        items.push(doc.data())
      })
      setFirebaseFriendList(items)
      setIsLoading(false)
    })
  }
// Przy  zmianie usera z którym rozmawiamy updatujemy dane userów
  useEffect(() => {
    setIsLoading(true)
    updateFriends()
  }, [props.hisUid, props.userProps.uid])

  if (isLoading === false)
    return (
      <div className='  friendsList'>
        {firebaseFriendList.map((friends, index) => (
          <div key={index}>
            <div>
              <div
                onClick={() => {
                  if (friends.uid !== props.hisUid)
                    history.push(`/chat/${friends.uid}`)
                }}
                className={` friendsList__friend--position friendsList__friend ${
                  friends.uid === props.hisUid
                    ? 'friendsList__friend--active'
                    : ''
                }`}
                style={{ cursor: 'pointer' }}
              >
                <img className='friends-img' src={friends.url} alt='' />
                <div className='friendsList__friend__name friendsList__friend__name--style'>
                  {friends.name} {friends.surname}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  else return <div className='  friendsList'></div>
}
