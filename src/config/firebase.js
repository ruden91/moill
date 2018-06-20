import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCW3AfweF9F0CfmgXVQ2GGqri6aJIgCtZM",
  authDomain: "moill-12e36.firebaseapp.com",
  databaseURL: "https://moill-12e36.firebaseio.com",
  projectId: "moill-12e36",
  storageBucket: "moill-12e36.appspot.com",
  messagingSenderId: "850329637690"
};

firebase.initializeApp(config);

export default firebase;

export const auth = firebase.auth();

export const database = firebase.database();
