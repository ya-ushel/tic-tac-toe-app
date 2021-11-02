import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NeomorphBlur } from 'react-native-neomorph-shadows';

import { login } from 'store/redusers/userSlice';
import { RoomList } from 'components';
import { Header, CreateRoom } from './components/';

const HomeScreen = ({ setScreen, setGameId }) => {
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();

  const onLogin = () => {
    dispatch(login());
  };

  useEffect(() => {}, []);

  return (
    <View style={{ flex: 1, marginBottom: 30 }}>
      <Header />
      <RoomList setScreen={setScreen} setGameId={setGameId} />
      <CreateRoom />
    </View>
  );
};

export default HomeScreen;
