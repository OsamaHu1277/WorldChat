import React from 'react'
import firebase from 'firebase/app'
import './css/signIn.css'
function SignIn({ auth }) {

    const SignInWithGoogle = () => {
        const Provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(Provider)
    }

    return (
        <div className="SignInCont">
            <h1 className="title">
                Enter World Chat
               </h1>
            <div className="container">
                <button onClick={SignInWithGoogle}>Sign in with Google</button>
            </div>
        </div>
    )
}

export default SignIn
