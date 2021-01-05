import React, { useState, useEffect } from 'react';
import './App.css';
import MessageWindow from './components/MessageWindow';
import TextBar from './components/TextBar'
import { registerOnMessageCallback, send, startWebsocketConnection } from './websocket'
import { v4 as uuid } from 'uuid';

function App() {

  let [messages, setMessages] = useState([])
  let [usersCache, setUsersCache] = useState([])
  let [username, setUsername] = useState(null)
  let [image] = useState("https://randomuser.me/api/portraits/men/" + Math.floor(Math.random() * 100) + ".jpg")

  useEffect(() => {
    startWebsocketConnection(image)
  }, [])

  let onMessageReceived = (msg, usersCache2) => {
    // Once we receive a message, we will parse the message payload
    // Add it to our existing list of messages, and set the state
    // with the new list of messages
    console.log("MessgaesMEssages: ", messages)

    msg = JSON.parse(msg)
    let newMessages = [].concat(msg, messages)

    console.log("new Messages: ", newMessages)
    setMessages(
      newMessages
    )

    setUsersCache(usersCache2)

    /*const chatList = document.querySelector('div.chat-history > ul > div');
    if (chatList !== null) {
      chatList.scrollTop = chatList.scrollHeight
    }*/
  }

  registerOnMessageCallback(onMessageReceived)

  // This method accepts the message text
  // It then constructs the message object, stringifies it
  // and sends the string to the server using the `send` function
  // imported from the websockets package
  let sendMessage = (text) => {
    const message = {
      username: username,
      userImage: image,
      text: text,
      id: uuid()
    }
    message.usersCache = usersCache
    send(JSON.stringify(message))
  }

  let inputStyle = {
    height: 55 + 'px',
    width: 250 + 'px',
    fontSize: 27 + 'px'
  };

  return (
    !username ? (
      <div className='container'>
        <div className='container-title'>Enter Username</div>
        <TextBar onSend={setUsername} style={inputStyle} userCache={usersCache} />
      </div>
    ) :
      <div className='container'>
        <div className='container-title'>Messages</div>
        <MessageWindow messages={messages} username={username} />
        <TextBar onSend={sendMessage} style={inputStyle} userCache={usersCache} />
      </div>
  )

}

export default App;
