import { persistStore } from 'redux-persist';

import axios from './axios';
import { socket, initSockets } from './socket';
import store from '../store';

const persistor = persistStore(store);

const waitForStore = () => {
  return new Promise((res, rej) => {
    const interval = setInterval(() => {
      const { bootstrapped } = persistor.getState();
      console.log('bootstrapped', persistor.getState());
      if (bootstrapped) {
        clearInterval(interval);
        res();
      }
    }, 200);
  });
};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export { axios, socket, initSockets, waitForStore, wait };
