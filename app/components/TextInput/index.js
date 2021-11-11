import React, { useState } from 'react';
import { View, TextInput as TextInputNative } from 'react-native';

import { Label } from 'components';
import styles from './styles';

const TextInput = ({ initialValue = '', onChangeText, style, ...props }) => {
  const [value, setValue] = useState(initialValue);
  const onChange = value => {
    setValue(value);
    onChangeText(value);
  };

  return (
    <View style={styles.container}>
      <TextInputNative
        value={value}
        autoCorrect={false}
        onChangeText={onChange}
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
};

export default TextInput;
