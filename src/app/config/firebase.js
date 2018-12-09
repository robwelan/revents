/*
  minimal way to import firebase and firestore
  uncomment the things you need...
*/
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import 'firebase/messaging';

/* the maximal way */
// import * as firebase from 'firebase';
// import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const firestoreSettings = {
  timestampsInSnapshots: true,
};

firestore.settings(firestoreSettings);

export default firebase;
