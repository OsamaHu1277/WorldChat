import React, { useRef, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app'
import './css/ChatRoom.css'
import ChatMessages from './ChatMessages'
const ChatRoom = ({ auth, firestore }) => {


    const messages = firestore.collection('message');
    const query = messages.orderBy('createdAt').limitToLast(25);
    const [DataMessages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('')
    const { uid, photoURL, displayName, email } = auth.currentUser;
    const ScrollByAdding = useRef()

    const sendMessage = async (e) => {
        e.preventDefault();
        // const { uid, photoURL } = auth.currentUser;
        if (!formValue || formValue.replace(/^\s+/, "").replace(/\s+$/, "") === "") return;
        await messages.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            time: new Date().toLocaleTimeString(),
            uid,
            photoURL,
            displayName,
            email
        })
        setFormValue('')
        ScrollByAdding.current.scrollIntoView({ behavior: 'smooth' })
    }



    return (
        <div className="ChatRoomContainer">
            <div className="chatWindow">
                {DataMessages && DataMessages.map(msg => <ChatMessages key={msg.id} message={msg} auth={auth} />)}
                <div ref={ScrollByAdding}></div>
            </div>
            <img className="UserIcon" src={photoURL} alt=""></img>
            <div className="profile">
                <p className="name">{displayName}</p>
                <p className="email">{email}</p>
            </div>
            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type a message" />

                <button type='submit' disabled={!formValue || formValue.replace(/^\s+/, "").replace(/\s+$/, "") === ""}>Send</button>
            </form>
            <button className="signOut" onClick={() => auth.signOut()} >Sign Out</button>
        </div>
    )
}

export default ChatRoom
