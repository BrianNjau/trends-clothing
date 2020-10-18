import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA_NI7Vwli4AyBQ-4L2axzjmUACqDDntmE",
  authDomain: "trend-db-b9df1.firebaseapp.com",
  databaseURL: "https://trend-db-b9df1.firebaseio.com",
  projectId: "trend-db-b9df1",
  storageBucket: "trend-db-b9df1.appspot.com",
  messagingSenderId: "851391375328",
  appId: "1:851391375328:web:0d9c61d8fd0b1f7f2c6d85",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
