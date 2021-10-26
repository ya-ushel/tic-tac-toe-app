import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

import config from '../config';

const initFirebase = async () => {
  //   const app = await firebase.initializeApp(config.firebaseConfig);
  //   console.log('initFirebase', app);
};

const signInAnonymously = async () => {
  try {
    const res = await auth().signInAnonymously();
    console.log('res', res);
  } catch (e) {
    console.log('error', e);
  }
};

export { initFirebase, signInAnonymously };
