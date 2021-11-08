import { io } from 'socket.io-client';

import store from 'store';
import config from '../config';

let socket = null;

const initSockets = async () => {
  return new Promise((res, rej) => {
    const {
      user: { data },
    } = store.getState();

    socket = io(config.apiUrl, {
      secure: true,
      transports: ['websocket'],
      auth: { userId: data?.id },
    });

    socket.on('connect_error', err => {
      res();
      console.log('connect_error', err, err.message);
    });

    socket.on('connect', () => {
      console.log('connect!', socket);
      res();
    });
  });
};

export { socket, initSockets };
