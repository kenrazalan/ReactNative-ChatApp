import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {API_KEY,AUTH_DOMAIN,PROJECT_ID,STORAGE_BUCKET,MESSAGING_SENDER_ID,APP_ID} from '@env'



// const firebaseConfig = {
//     apiKey: API_KEY,
//     authDomain: "chatapp-3579d.firebaseapp.com",
//     projectId: "chatapp-3579d",
//     storageBucket: "chatapp-3579d.appspot.com",
//     messagingSenderId: "244114671224",
//     appId: "1:244114671224:web:dfd68ba6be11f148ad0f8d"
//   };

  const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
  };

  let app;

  if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig)
  } else {
    app = firebase.app()
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export {db,auth}