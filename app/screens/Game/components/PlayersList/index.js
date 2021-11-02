import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import { Label, UserAvatar } from 'components';
import { socket } from 'utils';
import styles from './styles';

const PlayersList = ({ data }) => {
  const swiperRef = useRef();
  const user = useSelector(state => state.user.data);

  const renderItem = item => {
    const onTip = () => {
      socket.emit('player.tip', item.id);
    };

    return (
      <View style={styles.playerContainer}>
        <TouchableOpacity onPress={onTip}>
          <UserAvatar size={50} label="P" />
        </TouchableOpacity>

        <Label style={styles.playerName}>Player</Label>
      </View>
    );
  };

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
