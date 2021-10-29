import React, { useState, useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

import { waitForStore } from './utils/';
import { HomeScreen } from './screens';
import { setDoc, signInAnonymously } from './firebase/';
import store from './store';
import { login } from './store/redusers/userSlice';

const persistor = persistStore(store);

const App = () => {
  const [appReady, setAppReady] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      await waitForStore();
      const { user } = store.getState();

      if (!user.data) {
        const { user: newUser } = await signInAnonymously();
        const userDocument = {
          id: newUser.uid,
          createdAt: Date.now(),
          nickname:
            'Player' + Math.floor(Math.random() * (9999 - 1000 + 1) + 1000),
        };

        await setDoc('users', userDocument.id, userDocument);
        store.dispatch(login(userDocument));
      }
      setAppReady(true);
    } catch (error) {
      console.log('init error', error);
    }
  };

  if (!appReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <HomeScreen />
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
