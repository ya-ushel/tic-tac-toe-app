import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { login } from '../../store/redusers/userSlice';
import { RoomList } from '../../components';
import { Header } from './components/';

const HomeScreen = () => {
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();

  const onLogin = () => {
    dispatch(login());
  };

  useEffect(() => {}, []);
  console.log('user', user);
  return (
    <View>
      <Header />
      <RoomList />
    </View>
  );
};

export default HomeScreen;
