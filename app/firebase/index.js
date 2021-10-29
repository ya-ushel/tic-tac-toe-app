import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import config from '../config';

const initFirebase = async () => {
  //   const app = await firebase.initializeApp(config.firebaseConfig);
  //   console.log('initFirebase', app);
};

const setDoc = (collectionName, id, data) => {
  firestore().collection(collectionName).doc(id).set(data);
};

const signInAnonymously = async () => {
  try {
    return await auth().signInAnonymously();
  } catch (e) {
    console.log('error', e);
  }
};

export { setDoc, initFirebase, signInAnonymously };
