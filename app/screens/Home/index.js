import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { login } from 'store/redusers/userSlice';
import { RoomList } from 'components';
import { Header, CreateRoom } from './components/';

const HomeScreen = () => {
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();

  const onLogin = () => {
    dispatch(login());
  };

  useEffect(() => {}, []);
  console.log('user', user);
  return (
    <View style={{ flex: 1, marginBottom: 30 }}>
      <Header />
      <RoomList />
      <CreateRoom />
    </View>
  );
};

export default HomeScreen;
