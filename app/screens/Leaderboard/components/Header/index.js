import React from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';

import { Label } from 'components';

import styles from './styles';

const Header = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Label style={styles.title}>Leaderboard</Label>
      </View>
    </SafeAreaView>
  );
};

export default Header;
