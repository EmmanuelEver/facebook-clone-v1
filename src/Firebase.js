import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBmmjoWunfQhJpEGZhg8oxPDBqgogg1o94",
  authDomain: "facebook-clone-960b8.firebaseapp.com",
  databaseURL: "https://facebook-clone-960b8.firebaseio.com",
  projectId: "facebook-clone-960b8",
  storageBucket: "facebook-clone-960b8.appspot.com",
  messagingSenderId: "45685637294",
  appId: "1:45685637294:web:0fde15a82f2cb9872b6d3f",
  measurementId: "G-TMRMQBZTWK"
};


const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const storage = firebaseApp.storage()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
 
export { auth, provider, storage };
export default db;