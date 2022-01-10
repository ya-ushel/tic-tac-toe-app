import React, { useRef, useState } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { login } from 'store/redusers/userSlice';
import { Icon, Label, GameRules } from 'components';
import Navigator from 'navigation';

import styles from './styles';

const IntroScreen = () => {
  const swiperRef = useRef();

  const onFinish = () => {
    Navigator.setRootWithTabs();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Label style={styles.title}>Welcome to Tic tac toe!</Label>
        <Label style={styles.description}>
          Here you can read the basic rules of the game
        </Label>
      </View>
      <GameRules swiperRef={swiperRef} onFinish={onFinish} />
    </SafeAreaView>
  );
};

export default IntroScreen;
