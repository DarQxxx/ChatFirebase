import React from 'react'
import {  useHistory } from 'react-router-dom'
export default function Homepage() {

    const history = useHistory();
    function handleClick(){
        history.push(`/login`)
        
    }
    return (
        <div className="homepage d-flex flex-column text-center justify-content-center">
            <div className="homepage__text homepage__text--style m-auto">
                Chat with friends 
                and  meet new people around the world

                <div className="startBtn startBtn__homepage--position" onClick={handleClick}>  Get started there </div>  

                
            </div>

        </div>
    )
}
