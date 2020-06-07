import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import "firebase/auth";

export const initializeFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBZUBBJUROkEVfU4BqbgN477W8sUypqa1g",
    authDomain: "isracardtest-c3c0f.firebaseapp.com",
    databaseURL: "https://isracardtest-c3c0f.firebaseio.com",
    projectId: "isracardtest-c3c0f",
    storageBucket: "isracardtest-c3c0f.appspot.com",
    messagingSenderId: "446025579338",
    appId: "1:446025579338:web:e5599b83c45f938734dfb3",
    measurementId: "G-0521WNQGSQ"
  };

  firebase.initializeApp(firebaseConfig);
};

export const signInWithGoogle = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId: '446025579338-moc633nppnrr3vdifhnfr8fitidcas6a.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
      await firebase.auth().signInWithCredential(credential);
    }
  } catch (e) {
    console.error(e);
  }
};
