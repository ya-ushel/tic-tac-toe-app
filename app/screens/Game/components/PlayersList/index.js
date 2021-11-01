import React, { useRef, useState } from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import { Button, Label, UserAvatar, TextInput, SvgIcon } from 'components';
import { createRoom } from 'actions/rooms';
import { socket } from 'utils';
import styles from './styles';

const { width, height } = Dimensions.get('screen');
const PlayersList = ({ data }) => {
  const swiperRef = useRef();
  const user = useSelector(state => state.user.data);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  console.log(' width, height ', width, height);
  const renderItem = item => {
    return (
      <View style={styles.playerContainer}>
        <UserAvatar size={50} label="P" />
        <Label style={styles.playerName}>Player</Label>
      </View>
    );
  };
  console.log('data', data);
  return (
    <View style={styles.container}>
      <SwiperFlatList
        data={data}
        ref={swiperRef}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  );
};

export default PlayersList;
