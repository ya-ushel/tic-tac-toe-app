import { persistStore } from 'redux-persist';

import axios from './axios';
import store from '../store';

const persistor = persistStore(store);

const waitForStore = () => {
  return new Promise((res, rej) => {
    const interval = setInterval(() => {
      const { bootstrapped } = persistor.getState();

      if (bootstrapped) {
        clearInterval(interval);
        res();
      }
    }, 200);
  });
};

export { axios, waitForStore };
