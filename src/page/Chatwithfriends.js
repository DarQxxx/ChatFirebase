import React, {useRef, useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { getAnything, getMessagesWithFriend, time } from '../firebase';
export default function Chatwithfriends() {
    const params = useParams()
    const messageInput = useRef();
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [fireBaseMessages, setFireBaseMessages] = useState([])
    const [firebaseFriendList, setFirebaseFriendList] = useState([]);
    const [profileImage, setProfileImage] = useState(null)

    const msg1 = getMessagesWithFriend(params.myuid, params.hisuid);
    const msg2 = getMessagesWithFriend(params.hisuid, params.myuid);
    function updateMessages() {
      msg1.orderBy('createdAt').onSnapshot((querySnapshot) => {
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
        getAnything("users").doc(params.hisuid).onSnapshot((doc) => {setProfileImage(doc.data().url)});
        updateMessages();
        updateFriends();
    }, [])



    
  


  
  function handleInput(e){
    setMessage(messageInput.current.value);
  }

  function sendMessageWithEnter(e){
    if (e.key === "Enter" && (message != "")){

      msg1.add({
        text: message,
        createdAt: time(),
        uid: params.myuid,
    
      })

      msg2.add({
        text: message,
        createdAt: time(),
        uid: params.myuid,
    
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
  

    return (
 <div>
    
    <div className="container">
 
          <div className="row ">
          <div className="col-1 p-0">
          {firebaseFriendList.map((friends) =>(
            <div>
              {friends.uid != params.myuid && <Link to={`/chat/${params.myuid}/${friends.uid}`}><div className="text-center pt-3"><img className="friends-img" src={friends.url} alt=""/></div></Link>}
            </div>
            
          ))}
      </div>
            <div className=" text-center col-11 p-0 back">
           {/*   {chatMessages.map((message, index)=> (<div className="messages-every messages-my" key={index}><div className="message-direct message-direct-my">{message}</div></div>))} */}
            {fireBaseMessages.map((msg) => (
              <div>
                {msg.uid === params.myuid ? (<div className="messages-every messages-my"  key={msg.id}>
                  <p className="message-direct message-direct-my">{msg.text}</p>
                  </div>) : 
                  (<div className="messages-every messages-his"  key={msg.id}>
                    <img className="message-direct-his-img" src = {profileImage} alt="niemaimg"/>
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
