import firebase from "firebase/app";
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyDTnj2FIoxGgZmlxiGZDZ3swITVsMDmC2c",
    authDomain: "react-blog-f037c.firebaseapp.com",
    databaseURL: "https://react-blog-f037c-default-rtdb.firebaseio.com",
    projectId: "react-blog-f037c",
    storageBucket: "react-blog-f037c.appspot.com",
    messagingSenderId: "1026427742170",
    appId: "1:1026427742170:web:856eae74760632fb7982e3"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;