import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

const Label = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[styles.label, style]}>
      {children}
    </Text>
  );
};

export default Label;
