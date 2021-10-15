import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyC9l1Iaz1SOGX_0O0guEX5tjiNB_6hZYqc",
  authDomain: "clothingstoredb-f6e71.firebaseapp.com",
  projectId: "clothingstoredb-f6e71",
  storageBucket: "clothingstoredb-f6e71.appspot.com",
  messagingSenderId: "1048721584337",
  appId: "1:1048721584337:web:c10d616fd92f29ec2295f0",
  measurementId: "G-1Q8BQ5BT1F",
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
