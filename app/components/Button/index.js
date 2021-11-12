import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-neomorph-shadows';

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
  value,
  ...props
}) => {
  const opacity = disabled ? 0.5 : 1;
  const [size, setSize] = useState({ height: 0, width: 0 });
  const switchable = typeof value !== 'undefined';

  const onLayout = event => {
    const { height, width } = event.nativeEvent.layout;
    setSize({ height, width });
  };

  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        onLayout={onLayout}
        activeOpacity={switchable ? 1 : 0.2}
        style={[
          styles.container,
          style,
          {
            backgroundColor: colors[color],
            opacity: props.opacity || opacity,
          },
        ]}
        {...props}>
        <Shadow
          inner
          style={[
            styles.shadow,
            {
              shadowOpacity: switchable && value ? 0.5 : 0,
              shadowColor: 'black',
              backgroundColor: colors[color],
              width: size.width,
              height: size.height,
            },
          ]}
        />
        {renderIcon ? (
          renderIcon()
        ) : (
          <Label style={[styles.label, labelStyle]}>{children}</Label>
        )}
      </TouchableOpacity>
    </>
  );
};

export default Button;
