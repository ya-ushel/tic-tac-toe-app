import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Label } from 'components';
import styles from './styles';

const colors = {
  red: '#e63946',
  green: '#90be6d',
  yellow: '#fb8500',
  gold: '#ffc300',
};

const Button = ({
  labelStyle,
  children,
  style,
  color = 'green',
  disabled,
  renderIcon,
  ...props
}) => {
  const opacity = disabled ? 0.5 : 1;
  // console.log('icon', icon);
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.container,
        style,
        { backgroundColor: colors[color], opacity: props.opacity || opacity },
      ]}
      {...props}>
      {renderIcon ? (
        renderIcon()
      ) : (
        <Label style={[styles.label, labelStyle]}>{children}</Label>
      )}
    </TouchableOpacity>
  );
};

export default Button;
