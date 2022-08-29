import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/storage'



const firebaseConfig = {
    apiKey: "AIzaSyBxwsn1pnsy1vRKxvN86rNkcMm43gOnoL0",
    authDomain: "sistema-web-obdent-peru.firebaseapp.com",
    projectId: "sistema-web-obdent-peru",
    storageBucket: "sistema-web-obdent-peru.appspot.com",
    messagingSenderId: "192582945532",
    appId: "1:192582945532:web:5a4b8196cbc6c562fe6579"
  };
  
  
  firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore()
  const auth=firebase.auth()
  const functions=firebase.functions()
  const storage=firebase.storage()

  export {db,auth,firebase,functions,storage}