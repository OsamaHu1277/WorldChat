import React from 'react'
import firebase from 'firebase/app'
import './css/signIn.css'
function SignIn({ auth }) {

    const SignInWithGoogle = () => {
        const Provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(Provider)
    }

    return (
        <section className="SignIn_page">
            <h1 className="title">
                Enter World Chat
               </h1>
            <div className="sign_btn">
                <button onClick={SignInWithGoogle}>Sign in with Google</button>
            </div>
            <p className="copyright"><h3>Made with <i className="fa fa-heart"></i> by <a href="https://github.com/OsamaHu1277/WorldChat" title="Hi!">OSMX</a> © 2021</h3></p>
        </section>
    )
}

export default SignIn
