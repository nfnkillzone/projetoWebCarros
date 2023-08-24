
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBOr6VH5d7XNDxQkFD5BT3pxdp7RcITs2k",
  authDomain: "webcarros-6fc29.firebaseapp.com",
  projectId: "webcarros-6fc29",
  storageBucket: "webcarros-6fc29.appspot.com",
  messagingSenderId: "498549374757",
  appId: "1:498549374757:web:139dddd68f5d3c8d4da4cc"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage};