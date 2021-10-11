import React, { useEffect, useRef, useState } from 'react'




export default function App() {
  const [heightOfMessagedBoard, setHeightOfMessagedBoard] = useState("0");
  const [heightOfMessageField, setHeightOfMessageField] = useState("0")
  const messageInput = useRef();
useEffect(() => {
  //bierzemy wysokość diva, będącego rodzicem inputa
  let messagesHeight = document.querySelector(".msg-field").offsetHeight;
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

function changeHeight(event){
  let messagesHeight = document.querySelector(".msg-field").offsetHeight;
  console.log(messagesHeight);
  console.log(heightOfMessageField)
  if (messagesHeight != heightOfMessageField){
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
  } 

}

function test(){
  console.log("test");
}

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className=" back text-center col-12">
            Rozmawiaj ze swoimi znajomymi
          </div>

          
        </div>
        <div className="row">
        <div className=" msg-field text-center col-12 ">
              <form>
                <div contentEditable="true" className="msg-field--textarea col-11 msg-field--textarea-clear" ref={messageInput} onKeyPress={changeHeight}></div>
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}

