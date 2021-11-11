import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';

import { Label, UserAvatar } from 'components';
import styles from './styles';

const { width } = Dimensions.get('screen');
const PlayersScores = ({ players }) => {
  const sortedPlayers = players.sort((a, b) => b.score - a.score);

  const renderPlayer = player => {
    return (
      <View style={styles.player} key={player.id}>
        <View style={styles.rowContainer}>
          <UserAvatar
            backgroundColor={player.avatarColor}
            size={50}
            label="P"
          />
          <Label style={styles.playerName}>{player.nickname}</Label>
        </View>
        <Label style={styles.playerScore}>{player.score}</Label>
      </View>
    );
  };

  return (
    <View style={[styles.container, { height: width }]}>
      <ScrollView style={{ flex: 1, height: width }}>
        {sortedPlayers.map(renderPlayer)}
      </ScrollView>
    </View>
  );
};

export default PlayersScores;
