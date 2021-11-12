import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { login } from 'store/redusers/userSlice';
import { Label, UserAvatar } from 'components';
import { socket } from 'utils';
import Navigator from 'navigation';

import { Header } from './components';
import styles from './styles';

const ProfileScreen = ({}) => {
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
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <UserAvatar
            backgroundColor={user?.avatarColor}
            label={user?.nickname}
            size={50}
          />
          <Label style={styles.nickname}>{user?.nickname}</Label>
        </View>
        <View style={{ marginTop: 30 }}>
          <View style={{ marginVertical: 5, flexDirection: 'row' }}>
            <Label style={styles.userInfo}>Rating:</Label>
            <Label style={styles.rating}>{user?.rating}</Label>
          </View>
          <View style={{ marginVertical: 5, flexDirection: 'row' }}>
            <Label style={styles.userInfo}>Coins:</Label>
            <Label style={styles.rating}>{user?.coins}</Label>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
