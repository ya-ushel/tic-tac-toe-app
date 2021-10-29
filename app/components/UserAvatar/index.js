import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const UserAvatar = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label[0]}</Text>
    </View>
  );
};

export default UserAvatar;
