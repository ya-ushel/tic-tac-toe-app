import React from 'react';
import { View } from 'react-native';

import Label from '../Label/';
import styles from './styles';

const UserAvatar = ({ label }) => {
  return (
    <View style={styles.container}>
      <Label style={styles.label}>{label[0]}</Label>
    </View>
  );
};

export default UserAvatar;
