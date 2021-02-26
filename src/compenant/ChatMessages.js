import React from 'react'
import './css/ChatMessages.css'

const ChatMessages = ({ message, auth }) => {
    const { text, uid, photoURL, displayName, time } = message
    const MessageStat = uid === auth.currentUser.uid ? 'sent' : 'received';


    return (
        <div className={`message ${MessageStat}`}>
            <img className="chat_avatar" src={photoURL} alt=""></img>
            {/* <p className="displayName">{displayName}</p> */}
            <p className="text">{text} <br /><span className="date">{time}</span></p>
            {/* <p className="date"></p> */}
        </div>
    )
}

export default ChatMessages
