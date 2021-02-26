import React from 'react'
import './Sidebar.css'
export default function Sidebar({ auth }) {
    const { photoURL, displayName, email } = auth.currentUser;

    return (
        <aside>
            <img className="avatar" src={photoURL} alt=""></img>
            <div className="info">
                <p className="username">{displayName}</p>
                <p className="mail">{email}</p>
            </div>
            <button title="Sign Out" className="signOut" onClick={() => auth.signOut()} ><i className="fas fa-sign-out-alt"></i></button>
        </aside>
    )
}
