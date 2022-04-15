import firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCxGEKeQ9Lq184gvCBnAFSfIicbcJklBRU",
  authDomain: "bennebos-fine.firebaseapp.com",
  databaseURL: "https://bennebos-fine-default-rtdb.firebaseio.com",
  projectId: "bennebos-fine",
  storageBucket: "bennebos-fine.appspot.com",
  messagingSenderId: "122039250305",
  appId: "1:122039250305:web:b7a0ae1fdb1544ed8c4c80",
  measurementId: "G-08244FTBJK"
};

firebase.initializeApp(config);
const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

const database = firebase.database();

export {
  database,
  auth,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider
};


