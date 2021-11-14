import React from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { Label } from 'components';

import styles from './styles';

const Header = () => {
  const user = useSelector(state => state.user.data);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View />
        <Label style={styles.title}>Profile</Label>
        <View />
      </View>
    </SafeAreaView>
  );
};

export default Header;
