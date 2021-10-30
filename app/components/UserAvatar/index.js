import React from 'react';
import { View } from 'react-native';

import Label from '../Label/';
import styles from './styles';

const UserAvatar = ({ label, style, labelStyle, size = 40 }) => {
  const sizeStyles = { width: size, height: size, borderRadius: size / 2.6 };

  return (
    <View style={[styles.container, sizeStyles, style]}>
      <Label style={[styles.label, labelStyle]}>{label[0]}</Label>
    </View>
  );
};

export default UserAvatar;
