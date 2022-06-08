import * as firebase from "firebase";
import "firebase/database";


let config = {
  apiKey: "AIzaSyDBWFIycmfHb56DxHzeY3lRY2UfpL1W8CY",
  authDomain: "safety-key.firebaseapp.com",
  databaseURL: "https://safety-key-default-rtdb.firebaseio.com",
  projectId: "safety-key",
  storageBucket: "safety-key.appspot.com",
  messagingSenderId: "492622345507",
  appId: "1:492622345507:web:a012ab37d05e5aafc98896"
};

firebase.initializeApp(config);

export default firebase.database();
