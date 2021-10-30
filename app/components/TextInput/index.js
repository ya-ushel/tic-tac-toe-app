import React, { useState } from 'react';
import { View, TextInput as TextInputNative } from 'react-native';

import { Label } from 'components';
import styles from './styles';

const TextInput = ({ initialValue = '', onChange }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <View style={styles.container}>
      <TextInputNative
        value={value}
        autoCorrect={false}
        onChangeText={setValue}
        style={styles.input}
      />
    </View>
  );
};

export default TextInput;
