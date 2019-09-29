import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBHPdwHnYYsfW9TUQVJUHwPSdoQmTuMYPE",
  authDomain: "shopping-cart-2fde7.firebaseapp.com",
  databaseURL: "https://shopping-cart-2fde7.firebaseio.com",
  projectId: "shopping-cart-2fde7",
  storageBucket: "",
  messagingSenderId: "504386502398",
  appId: "1:504386502398:web:60346ad1b6232d9686afaf",
  measurementId: "G-BLRQJZ2QB0"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.database().ref();