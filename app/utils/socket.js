import { io } from 'socket.io-client';

import store from 'store';
import config from '../config';
import { update } from 'store/redusers/userSlice';

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

    socket.on('user.updated', ({ user }) => {
      console.log('user.updated', user);
      store.dispatch(update(user));
    });
  });
};

export { socket, initSockets };
