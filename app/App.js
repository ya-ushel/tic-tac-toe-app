import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Navigation } from 'react-native-navigation';
import { persistStore } from 'redux-persist';
import SplashScreen from 'react-native-splash-screen';

import config from 'config';
import { setUserOnline } from './actions/user';
import { waitForStore, initSockets, socket } from './utils/';
import { getDoc, setDoc, signInAnonymously } from './firebase/';
import store from './store';
import { login } from './store/redusers/userSlice';

import { registerScreens } from './screens';
import Navigator from './navigation';
import { defaultOptions } from './constants/navigation';

export default class App {
  async setRoot(isAuthorized) {
    if (true) {
      await Navigator.setRootWithTabs();
    } else {
      await Navigator.setRoot('AuthScreen');
    }
  }

  async onAppLaunched() {
    try {
      await waitForStore();

      const { user } = store.getState();

      if (!user.data) {
        const { user: newUser } = await signInAnonymously();

        const getRandom = (min, max) =>
          Math.floor(Math.random() * (min - max + 1) + max);

        const userDocument = {
          id: newUser.uid,
          createdAt: Date.now(),
          avatarColor:
            config.avatarColors[getRandom(0, config.avatarColors.length)],
          nickname: 'Player' + getRandom(1000, 9999),
          coins: 500,
          experience: 0,
          rating: 1000,
          gameHistory: [],
        };

        await setDoc('users', userDocument.id, userDocument);
        store.dispatch(login(userDocument));
      } else {
        const userDocument = await (await getDoc('users', user.data.id)).data();
        console.log('userDocument', userDocument);
        store.dispatch(login(userDocument));
      }

      await initSockets();
      // await listenSockets();

      setUserOnline();
      await Navigation.setDefaultOptions(defaultOptions);
      this.setRoot(true);
      SplashScreen.hide();
    } catch (error) {
      console.log('init error', error);
    }
  }

  async start() {
    persistStore(store, null, () => {
      registerScreens();

      Navigation.events().registerAppLaunchedListener(() =>
        this.onAppLaunched(),
      );
    });
  }
}
