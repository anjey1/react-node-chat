import React from 'react'

let Message = ({ text, username, isSelf, msgKey, userImage }) => {
    const rand2 = Math.floor(Math.random() * 10);
    return <div style={{ textAlign: isSelf ? "left" : "right", backgroundColor: "#F2F5F8", padding: "5px", margin: "5px", color: "black", }} key={msgKey}>
        <img className="massageItem" src={userImage} alt="avatar" />
        <li className="clearfix">
            <div className="message-data align-right">
                <span className="message-data-time" >{rand2 * 3}:{rand2 * 5} AM, Today</span> &nbsp; &nbsp;
                            <span className="message-data-name" >{username}</span> <i className="fa fa-circle me"></i>
            </div>
            <div className="message other-message float-right">{text}</div>
        </li>
    </div>
}

export default Message