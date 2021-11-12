import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { login } from 'store/redusers/userSlice';
import { Label } from 'components';
import { socket } from 'utils';
import Navigator from 'navigation';

import { Header } from './components';

const LeaderboardScreen = ({}) => {
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    listenSockets();

    return () => {
      unsubscribeSocketEvents();
    };
  }, []);

  const listenSockets = async () => {
    console.log('listenSockets');

    // socket.on('room.started', gameId => {
    //   console.log('room.started 1', gameId);
    //   Navigator.push(Navigator.activeComponentId, 'GameScreen', { gameId });
    // });
  };

  const unsubscribeSocketEvents = () => {
    // socket.off('room.started');
  };

  return (
    <View style={{ flex: 1, marginBottom: 30 }}>
      <Header />
      {/* <Label>LeaderboardScreen</Label> */}
    </View>
  );
};

export default LeaderboardScreen;
