import React from 'react'
import Message from './Message'

let MessageWindow = ({ messages = [], username }) => {
    console.log("Messages: ", messages);
    return <div className="chat-history">
        <ul>
            <div className="chat-list" style={{ maxHeight: "700px", overflowY: "scroll" }}>
                {
                    messages.map(msg => {
                        console.log("Key: ", msg.id);
                        return <Message
                            key={msg.id}
                            msgKey={msg.id}
                            text={msg.text}
                            username={msg.username}
                            userImage={msg.userImage}
                            isSelf={username === msg.username} />
                    })
                }
            </div>
        </ul>
    </div >

}

export default MessageWindow