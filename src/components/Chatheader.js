import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getAnything } from '../firebase';

export default function Chatheader() {
    const params = useParams();
    const [userData, setUserData] = useState({})
    console.log(params)


    useEffect(() => {
        getAnything('users')
          .doc(params.hisuid)
          .onSnapshot(doc => {
            setUserData({name: doc.data().name, surname: doc.data().surname, url:doc.data().url})
          })
      }, [params.hisuid])

    return (
        <div className="chatHead d-flex justify-content-between align-items-center">
            <div className="paddingl-5 chatHead__leftSide chatHead__leftSide--text">
               <img src={userData.url}/> {userData.name} {userData.surname}
            </div>

            <div className="paddingr-5">
                info
            </div >
        </div>
    )
}
