import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Label } from 'components';
import styles from './styles';

const Select = ({ variants, onChange, initialValue }) => {
  const [selected, setSelected] = useState(initialValue);

  const onSelect = variant => {
    setSelected(variant);
    onChange(variant);
  };

  const renderVariant = variant => {
    return (
      <TouchableOpacity
        onPress={() => onSelect(variant)}
        key={variant}
        style={[
          styles.variantContainer,
          selected === variant && styles.selectedVariantContainer,
        ]}>
        <Label>{variant}</Label>
      </TouchableOpacity>
    );
  };

  return <View style={styles.container}>{variants.map(renderVariant)}</View>;
};

export default Select;
