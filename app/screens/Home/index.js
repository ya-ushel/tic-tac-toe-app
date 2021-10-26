import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { login } from '../../store/redusers/userSlice';

const HomeScreen = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onLogin = () => {
    dispatch(login());
  };

  useEffect(() => {
    console.log('user', user);
  }, []);

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="login" onPress={onLogin}>
        login
      </Button>
    </View>
  );
};

export default HomeScreen;
