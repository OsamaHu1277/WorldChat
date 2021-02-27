import React, { useRef, useState, useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app'
import './css/ChatRoom.css'
import ChatMessages from './ChatMessages'
import Sidebar from './Sidebar/Sidebar';
import Filter from 'bad-words'
const ChatRoom = ({ auth, firestore }) => {

    var filterwords = new Filter();
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
            text: filterwords.clean(formValue),
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            time: new Date().toLocaleTimeString(),
            uid,
            photoURL,
            displayName,
            email
        })
        setFormValue('')
        // ScrollByAdding.current.scrollIntoView({ behavior: 'smooth' })
    }
    const scrollToBottom = () => {
        ScrollByAdding.current.scrollIntoView({ behavior: 'smooth' })
    }
    useEffect(() => {
        scrollToBottom()
    }, [DataMessages]);


    return (
        <div className="ChatRoomContainer">
            <Sidebar auth={auth} />
            <div className="chatWindow">
                <div className="chat">
                    {DataMessages && DataMessages.map(msg => <ChatMessages key={msg.id} message={msg} auth={auth} />)}
                    <div ref={ScrollByAdding}></div>
                </div>
                <form onSubmit={sendMessage}>
                    <input maxLength="2500" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type a message" />
                    <button type='submit' disabled={!formValue || formValue.replace(/^\s+/, "").replace(/\s+$/, "") === ""}><i class="fas fa-paper-plane"></i></button>
                </form>
            </div>
        </div>
    )
}

export default ChatRoom
