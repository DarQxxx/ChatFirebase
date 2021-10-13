import React, { useEffect, useRef, useState } from 'react'

export default function Chat() {
    const [heightOfMessagedBoard, setHeightOfMessagedBoard] = useState("0");
    const [heightOfMessageField, setHeightOfMessageField] = useState("0")
    const messageInput = useRef();
    const [message, setMessage] = useState("");
  useEffect(() => {
    //bierzemy wysokość diva, będącego rodzicem inputa
    let messagesHeight = document.querySelector(".msg-field--textarea").offsetHeight;
    //wysokość diva będącego tłem, na którym wyświetlają się wiadomości (wysokość ekranu - wysokość diva z inputem)
    let messageBoardHeight = window.innerHeight - messagesHeight;
    //łapiemy za div, który jest tłem wysłanych wcześniej wiadomości
    let messagedBoard = document.querySelector(".back");
    //ustawiamy wysokość tła wysłanych wcześniej wiadomości na to co obliczyliśmy
    messagedBoard.style.height = messageBoardHeight + "px";
    // zapisujemy wysokość tła wiadomości w state
    setHeightOfMessagedBoard(messageBoardHeight);
   // zapisujemy wysokość rodzica inputa w state
   setHeightOfMessageField(messagesHeight);
  
  }, [])
  
  function handleInput(e){
    console.log(e.target.value);
  
  }
  
  function test(){
    console.log("test");
  }
  
    return (
      <div>
        <div className="container ">
          <div className="row">
            <div className=" back text-center col-12 p0">
              
            </div>
          </div>
          <div className="row ">
                <form className="p-0 d-flex ">
                  <input type="text" className="msg-field--textarea  msg-field--textarea-clear w-100" placeholder="Aa" onChange={handleInput} ref={messageInput} ></input>
                  <a href="#" className=" border-left bg-info px-3 "><i className="bi bi-shuffle"></i></a>
                </form>
                
          </div>
        </div>
      </div>
)
}
