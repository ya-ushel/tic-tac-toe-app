import React, { useState, useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

import config from 'config';
import { setUserOnline } from './actions/user';
import { waitForStore, initSockets, socket } from './utils/';
import { HomeScreen, GameScreen } from './screens';
import { setDoc, signInAnonymously } from './firebase/';
import store from './store';
import { login } from './store/redusers/userSlice';

const persistor = persistStore(store);

const App = () => {
  const [screen, setScreen] = useState('home');
  const [gameId, setGameId] = useState(null);
  const [appReady, setAppReady] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    init();
  }, []);

  const listenSockets = async () => {
    socket.on('room.started', gameId => {
      setGameId(gameId);
      setScreen('game');
      console.log('room.started 1', gameId);
    });
  };

  const init = async () => {
    try {
      await waitForStore();
      const { user } = store.getState();

      if (user.data) {
        const { user: newUser } = await signInAnonymously();

        const getRandom = (min, max) =>
          Math.floor(Math.random() * (min - max + 1) + max);

        const userDocument = {
          id: newUser.uid,
          createdAt: Date.now(),
          avatarColor:
            config.avatarColors[getRandom(0, config.avatarColors.length)],
          nickname: 'Player' + getRandom(1000, 9999),
        };

        await setDoc('users', userDocument.id, userDocument);
        store.dispatch(login(userDocument));
      }

      await initSockets();
      await listenSockets();

      setUserOnline();
      setAppReady(true);
    } catch (error) {
      console.log('init error', error);
    }
  };

  if (!appReady) {
    return null;
  }
  console.log(screen);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        {screen === 'home' && (
          <HomeScreen setScreen={setScreen} setGameId={setGameId} />
        )}
        {screen === 'game' && (
          <GameScreen gameId={gameId} setScreen={setScreen} />
        )}
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
