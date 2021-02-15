import './App.css';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import SignIn from './compenant/signIn'
import { useAuthState } from 'react-firebase-hooks/auth'
import ChatRoom from "./compenant/ChatRoom";



firebase.initializeApp({
  apiKey: "AIzaSyCbbfy65c3rffMXCuJHmGoPDtM-ZyegvG0",
  authDomain: "reactworldchat.firebaseapp.com",
  projectId: "reactworldchat",
  storageBucket: "reactworldchat.appspot.com",
  messagingSenderId: "257493577902",
  appId: "1:257493577902:web:9149492d3c9b2adb61fd3f",
  measurementId: "G-8HZB5Q4WKT"
});



function App() {

  const auth = firebase.auth();
  const firestore = firebase.firestore();

  const [user] = useAuthState(auth)

  return (
    <div className="App">
      {user ? <ChatRoom auth={auth} firestore={firestore} /> : <SignIn auth={auth} />}
    </div>
  );
}

export default App;
