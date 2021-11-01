import React, { useEffect, useRef, useState } from 'react'

export default function Chat() {
    const [heightOfMessagedBoard, setHeightOfMessagedBoard] = useState("0");
    const [heightOfMessageField, setHeightOfMessageField] = useState("0")
    const messageInput = useRef();
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);






    
  


  
  function handleInput(e){
    setMessage(messageInput.current.value);
    console.log(message);     
  }

  function sendMessageWithEnter(e){
    if (e.key === "Enter" && (message != "")){
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
              {chatMessages.map((message, index)=> (<div className="messages-every messages-my" key={index}><div className="message-direct message-direct-my">{message}</div></div>))}
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