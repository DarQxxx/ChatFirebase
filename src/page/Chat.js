import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { db, getAnything, getMessages, time } from '../firebase';
import AppContext from '../hooks/AppContext';
import Chatwithfriends from './Chatwithfriends';

export default function Chat() {
    const messageInput = useRef();
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [fireBaseMessages, setFireBaseMessages] = useState([])
    const [uid, setUid] = useState(useContext(AppContext)[2])
    const [firebaseFriendList, setFirebaseFriendList] = useState([]);

    const msg = getMessages();

    function updateMessages() {
      msg.orderBy('createdAt').onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setFireBaseMessages(items);
      })
    }

    function updateFriends(){
      getAnything("users").onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setFirebaseFriendList(items);
      })
    }


    useEffect(() => {
      updateMessages();
      updateFriends();
    }, [])



    


  
  function handleInput(e){
    setMessage(messageInput.current.value);
  }

  function sendMessageWithEnter(e){
    if (e.key === "Enter" && (message !== "")){

      getMessages().add({
        text: message,
        photoUrl: "https://a-static.besthdwallpaper.com/anime-girl-i-motyle-tapeta-2560x1600-26669_7.jpg",
        createdAt: time(),
        uid,
    
      })

      setChatMessages([...chatMessages, message]);
      setMessage("");
      messageInput.current.value="";
    }
  }

  function sendMessage(e){
    if(message !== ""){
      setChatMessages([...chatMessages, message]);
      setMessage("");
      messageInput.current.value="";
  }
}
  
  function test(){
    console.log("test");
  }
  
 

    return (
 <div>
    
    <div className="container">
 
          <div className="row ">
          <div className="col-1 p-0">
          {firebaseFriendList.map((friends) =>(
            <div>
              {friends.uid !== uid && <Link to={`chat/${friends.uid}`}><div className="text-center pt-3"><img className="friends-img" src={friends.url} alt=""/></div></Link>}
            </div>
          ))}
      </div>
            <div className=" text-center col-11 p-0 back">
           {/*   {chatMessages.map((message, index)=> (<div className="messages-every messages-my" key={index}><div className="message-direct message-direct-my">{message}</div></div>))} */}
            {fireBaseMessages.map((msg) => (
              <div>
                {msg.uid === uid ? (<div className="messages-every messages-my"  key={msg.id}>
                  <p className="message-direct message-direct-my">{msg.text}</p>
                  </div>) : 
                  (<div className="messages-every messages-his"  key={msg.id}>
                    <img className="message-direct-his-img" src = {msg.photoUrl} alt="niemaimg"/>
                  <p className="message-direct message-direct-his">{msg.text}</p>
                  </div>) 
                  }
                

              </div>
            ))}
            </div>
          </div>
          <div className="row ">
            <div className="col-1"></div>
      <div className="p-0 d-flex col-11 ">
            <input type="text"  className="msg-field--textarea  msg-field--textarea-clear w-100" placeholder="Aa" onChange={handleInput} onKeyDown={sendMessageWithEnter} ref={messageInput} ></input>
            <a href="#" className=" border-left bg-info px-3 " onClick={sendMessage}><i className="bi bi-shuffle"></i></a>
          </div>        
       </div>

    </div>
  </div>
)}