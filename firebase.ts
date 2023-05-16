 import {getApp, getApps, initializeApp} from "firebase/app";
 import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7u5FbtXNmo813L8ilyrrVMsAwsfzG7F0",
  authDomain: "ts-chatgpt-f8947.firebaseapp.com",
  projectId: "ts-chatgpt-f8947",
  storageBucket: "ts-chatgpt-f8947.appspot.com",
  messagingSenderId: "480540314372",
  appId: "1:480540314372:web:d6874fe1bad4b4eebfde51"
};

const app = getApps().length ? getApp():initializeApp(firebaseConfig);
const db=getFirestore(app)
export {db}