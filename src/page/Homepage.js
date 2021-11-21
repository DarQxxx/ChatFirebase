import React from 'react'
import { Link } from 'react-router-dom'
import img1 from "../imgs/Group1.png"

export default function Homepage() {
    return (
        <div>
            <div className="wavy-bg">
            </div>
            
                <div className="container">
            <div className="d-flex justify-content-between">

                    <row>
                        <div >
                        Chat with friends 
                        Also talk and meet new people around the world
                        Get started there    
                        </div>
                    </row>

                    <row>
                        <div className="col-3">
                            <img src={img1}></img>   
                        </div>
                    </row>
                </div>
            </div>
        </div>
    )
}
