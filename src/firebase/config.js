import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAmXjlWugCzW7FKeKsVYFePKNo7TL3dOkY",
    authDomain: "steby-site.firebaseapp.com",
    projectId: "steby-site",
    storageBucket: "steby-site.appspot.com",
    messagingSenderId: "193550758033",
    appId: "1:193550758033:web:88db95bc9e5ba7c0150f30"
  };

// init firebase  
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

const timeStamp = firebase.firestore.Timestamp

export {projectAuth, projectFirestore, projectStorage, timeStamp}