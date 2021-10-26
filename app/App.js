import React, { useEffect } from 'react';
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

import { axios } from './utils/';
import { HomeScreen } from './screens';
import { signInAnonymously } from './firebase/';
import store from './store';

const persistor = persistStore(store);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  console.log(store.getState());
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    getRooms();
    signInAnonymously();
  }, []);

  const getRooms = async () => {
    try {
      const res = await axios.get('/rooms/list');
      console.log('res', res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <HomeScreen />
        </PersistGate>
      </Provider>
    </SafeAreaView>
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
