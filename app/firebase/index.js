import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import config from '../config';

const initFirebase = async () => {
  //   const app = await firebase.initializeApp(config.firebaseConfig);
  //   console.log('initFirebase', app);
};

const setDoc = async (collectionName, id, data) => {
  return await firestore().collection(collectionName).doc(id).set(data);
};

const getDoc = async (collectionName, id) => {
  return await firestore().collection(collectionName).doc(id).get();
};

const signInAnonymously = async () => {
  try {
    return await auth().signInAnonymously();
  } catch (e) {
    console.log('error', e);
  }
};

export { setDoc, getDoc, initFirebase, signInAnonymously };
