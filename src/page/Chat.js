import React, { useContext, useEffect, useRef, useState } from 'react'
import { db, getMessages, time } from '../firebase';
import AppContext from '../hooks/AppContext';

export default function Chat() {
    const [heightOfMessagedBoard, setHeightOfMessagedBoard] = useState("0");
    const [heightOfMessageField, setHeightOfMessageField] = useState("0")
    const messageInput = useRef();
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [fireBaseMessages, setFireBaseMessages] = useState([])
    const [uid, setUid] = useState(useContext(AppContext)[2])

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

    useEffect(() => {
      updateMessages()
    }, [])



    
  


  
  function handleInput(e){
    setMessage(messageInput.current.value);
  }

  function sendMessageWithEnter(e){
    if (e.key === "Enter" && (message != "")){

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
    if(message != ""){
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
        <div className="container back">
          <div className="row">
            <div className=" text-center col-12 p-0">
           {/*   {chatMessages.map((message, index)=> (<div className="messages-every messages-my" key={index}><div className="message-direct message-direct-my">{message}</div></div>))} */}
            {fireBaseMessages.map((msg) => (
              
                <div className="messages-every messages-my"  key={msg.id}>
                  <p className="message-direct message-direct-my">{msg.text}</p>
                <img style={{width: "50px", height: "50px", borderRadius:"50%"}} src = {msg.photoUrl} alt="niemaimg"/>

              </div>
            ))}
            </div>
          </div>

        </div>

  <div className="container">
    <div className="row ">
      <div className="p-0 d-flex ">
            <input type="text"  className="msg-field--textarea  msg-field--textarea-clear w-100" placeholder="Aa" onChange={handleInput} onKeyDown={sendMessageWithEnter} ref={messageInput} ></input>
            <a href="#" className=" border-left bg-info px-3 " onClick={sendMessage}><i className="bi bi-shuffle"></i></a>
          </div>        
       </div>
    </div>
  </div>
)}