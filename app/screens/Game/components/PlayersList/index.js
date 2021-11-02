import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import { Label, UserAvatar, Icon } from 'components';
import { socket } from 'utils';
import styles from './styles';

const PlayersList = ({ data, currentPlayerId }) => {
  const swiperRef = useRef();
  const user = useSelector(state => state.user.data);

  const renderItem = item => {
    const current = currentPlayerId === item.id;

    const onTip = () => {
      socket.emit('player.tip', item.id);
    };

    return (
      <View
        style={[
          styles.playerContainer,
          current && styles.currentPlayerContainer,
          { backgroundColor: item.color },
        ]}>
        <TouchableOpacity onPress={onTip}>
          <UserAvatar backgroundColor={item.avatarColor} size={50} label="P" />
        </TouchableOpacity>

        <View style={styles.playerInfo}>
          <Label style={styles.playerName}>{item.nickname}</Label>
          <View
            style={{
              marginTop: 2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Label style={styles.playerScore}>
              Score:{' '}
              <Label
                style={{
                  fontSize: 12,
                  color: '#ffba08',
                }}>
                {item.score}
              </Label>
            </Label>
            <Icon name={item.shape} width={5} height={5} color="white" />
          </View>
        </View>
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
