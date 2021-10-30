import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Label } from 'components';
import styles from './styles';

const Button = ({ labelStyle, children, style, ...props }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      <Label style={[styles.label, labelStyle]}>{children}</Label>
    </TouchableOpacity>
  );
};

export default Button;
