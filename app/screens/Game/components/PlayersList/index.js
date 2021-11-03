import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import { Label, UserAvatar, Icon } from 'components';
import { socket } from 'utils';
import styles from './styles';

const PlayersList = ({ data, gameStatus, currentPlayerId }) => {
  const swiperRef = useRef();
  const user = useSelector(state => state.user.data);
  const sortedFiltredPlayers = data.sort((a, b) => a.position - b.position);
  // .filter(({ status }) => status !== 'left');

  const currentPlayerIndex = sortedFiltredPlayers.findIndex(
    ({ id }) => currentPlayerId === id,
  );

  useEffect(() => {
    scrollToPlayer();
  }, [currentPlayerIndex]);

  const scrollToPlayer = () => {
    if (swiperRef && data.length > 1) {
      swiperRef.current.scrollToIndex({
        index: currentPlayerIndex,
      });
    }
  };

  const renderItem = item => {
    const current = currentPlayerId === item.id && gameStatus !== 'created';

    const onTip = () => {
      socket.emit('player.tip', item.id);
    };

    return (
      <View
        style={[
          { marginVertical: 17, marginHorizontal: 15, padding: 2 },
          current && [
            styles.currentPlayerContainer,
            { shadowColor: item.color },
          ],
        ]}>
        <View
          style={[
            styles.playerContainer,
            {
              backgroundColor: item.color,
              opacity: item.status === 'joined' ? 1 : 0.5,
            },
          ]}>
          <TouchableOpacity onPress={onTip}>
            <UserAvatar
              backgroundColor={item.avatarColor}
              size={50}
              label="P"
            />
          </TouchableOpacity>

          <View style={styles.playerInfo}>
            <Label style={styles.playerName}>{item.nickname}</Label>
            <View style={styles.playerInfoBottom}>
              <Label style={styles.playerScore}>
                Score: <Label style={styles.score}>{item.score}</Label>
              </Label>
              {/* <Icon name={item.shape} width={5} height={5} color="white" /> */}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SwiperFlatList
        data={sortedFiltredPlayers}
        ref={swiperRef}
        // index={currentPlayerIndex}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  );
};

export default PlayersList;
