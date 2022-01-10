import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NeomorphBlur } from 'react-native-neomorph-shadows';

import { login } from 'store/redusers/userSlice';
import { RoomList } from 'components';
import { socket } from 'utils';
import Navigator from 'navigation';

import { Header, CreateRoom } from './components/';

const HomeScreen = () => {
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();

  console.log('HomeScreenHomeScreen');

  useEffect(() => {
    listenSockets();

    return () => {
      unsubscribeSocketEvents();
    };
  }, []);

  const listenSockets = async () => {
    console.log('listenSockets');

    socket.on('room.started', gameId => {
      console.log('room.started 1', gameId);
      Navigator.push(Navigator.activeComponentId, 'GameScreen', { gameId });
    });
  };

  const unsubscribeSocketEvents = () => {
    socket.off('room.started');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <RoomList />
      <CreateRoom />
    </View>
  );
};

export default HomeScreen;
