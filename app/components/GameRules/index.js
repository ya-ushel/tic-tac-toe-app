import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-neomorph-shadows';
import Swiper from 'react-native-swiper';

import { Label, Button } from 'components';
import rules from './rules';
import styles from './styles';

const renderPagination = (index, total) => {
  return (
    <View style={{ marginBottom: 10, alignItems: 'center' }}>
      <Label style={{ letterSpacing: 2, opacity: 0.3 }}>
        {index + 1}/{total}
      </Label>
    </View>
  );
};
const GameRules = ({ onFinish, swiperRef }) => {
  const renderItem = item => {
    const onPress = () => {
      if (item.last) {
        onFinish();
      } else {
        swiperRef.current.scrollBy(1);
      }
    };

    return (
      <View style={styles.itemContainer}>
        <View
          style={{
            borderRadius: 5,
            width: 300,
            height: 400,
            backgroundColor: 'black',
            opacity: 0.3,
          }}
        />
        <Label style={styles.itemTitle}>{item.title}</Label>
        <Button
          onPress={onPress}
          style={{
            alignSelf: 'center',
            marginTop: 30,
            paddingVertical: 10,
            paddingHorizontal: 25,
          }}>
          {item.last ? 'Start' : 'Next'}
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Swiper
        showsButtons={false}
        loop={false}
        ref={swiperRef}
        renderPagination={renderPagination}>
        {rules.map(i => renderItem(i))}
      </Swiper>
    </View>
  );
};

export default GameRules;
