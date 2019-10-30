import * as firebase from "firebase";
//Initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyD95ZlnAl58mSDsv16KSNJ0VKr4CYpJG2w",
  authDomain: "deliver-e-e34da.firebaseapp.com",
  databaseURL: "https://deliver-e-e34da.firebaseio.com",
  projectId: "deliver-e-e34da",
  storageBucket: "deliver-e-e34da.appspot.com",
  messagingSenderId: "874425813575",
  appId: "1:874425813575:web:3dea7471636414ff09bf62",
  measurementId: "G-MR8W3SLHYT"
};
const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;
