import React, { useRef, useState } from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import { Button, Label, UserAvatar, TextInput, SvgIcon } from 'components';
import { createRoom } from 'actions/rooms';
import { socket } from 'utils';
import styles from './styles';

const { width, height } = Dimensions.get('screen');
const Info = ({ data }) => {
  return (
    <View style={styles.container}>
      <Label style={styles.title}>Waiting for players...</Label>
    </View>
  );
};

export default Info;
