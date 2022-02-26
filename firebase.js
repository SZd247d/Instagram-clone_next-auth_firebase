// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBD6SLzoeg-nfpb_qMhIkWTARhsol07A2I',
  authDomain: 'instagram-clone-494bf.firebaseapp.com',
  projectId: 'instagram-clone-494bf',
  storageBucket: 'instagram-clone-494bf.appspot.com',
  messagingSenderId: '290059977317',
  appId: '1:290059977317:web:ecacacc6de240587e37c8c',
}

// Initialize Firebase
const app = !getApps.lenghth ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
