import React from 'react'
import './css/ChatMessages.css'

const ChatMessages = ({ message, auth }) => {
    const { text, uid, photoURL, time } = message
    const MessageStat = uid === auth.currentUser.uid ? 'sent' : 'received';


    return (
        <div className={`message ${MessageStat}`}>
            <img className="chat_avatar" src={photoURL} alt=""></img>
            <p className="text">{text} <br /><span className="date">{time}</span></p>
        </div>
    )
}

export default ChatMessages
