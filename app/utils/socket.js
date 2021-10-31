import { io } from 'socket.io-client';

import store from 'store';
import config from '../config';

let socket = null;

const initSockets = async () => {
  return new Promise((res, rej) => {
    const {
      user: { data },
    } = store.getState();
    console.log('initSockets', data.id);

    socket = io(config.apiUrl, {
      transports: ['websocket'],
      allowUpgrades: false,
      auth: { userId: data.id },
    });

    socket.on('connect_error', err => {
      console.log('connect_error', err, err.message);
    });

    socket.on('connect', () => {
      console.log('connect!', socket);
      res();
    });
  });
};

export { socket, initSockets };
