import React, { useContext } from 'react'
import AppContext from '../hooks/AppContext';
import { getAnything, logout} from "../firebase"
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Header(props) {
    const [isLoggedIn] = useContext(AppContext);
    const [profileImage, setProfileImage] = useState(null)
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('authUser'))!== null)
        getAnything("users").doc(JSON.parse(localStorage.getItem('authUser')).uid).onSnapshot((doc) => {setProfileImage(doc.data().url)})
        
    }, [])


    return (
        <div>
            {props.bg === 0 ? (
            <div className="w-100 transparent-bg d-flex align-items-center">
                <div className="container">
                    <div className="color-white d-flex justify-content-end font-family-heebo ">
                    {isLoggedIn? 
                    (<div><Link  onClick={logout}  to="/login"> Wyloguj</Link></div>) : 
                    (<Link  to="/login"> Zaloguj</Link>)
                    }
                    
                    </div>
                </div>
            </div>) : (<div  className="w-100 full-width-gradient d-flex align-items-center">
                <div className="container">
                    <div className="color-white d-flex justify-content-end font-family-heebo ">
                    {isLoggedIn? 
                    (<div><img className="profileImage" src={profileImage}/><Link  onClick={logout}  to="/login"> Wyloguj</Link></div>) : 
                    (<Link  to="/login"> Zaloguj</Link>)
                    }
                    </div>
                </div>
            </div>

            )}

    </div>
    )
}
