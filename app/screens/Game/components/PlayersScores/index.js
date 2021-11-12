import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';

import { Label, UserAvatar, Icon } from 'components';
import styles from './styles';

const { width } = Dimensions.get('screen');
const PlayersScores = ({ players }) => {
  const sortedPlayers = players.sort((a, b) => a.place - b.place);

  const renderPlayer = player => {
    const seconds = player.spentTime / 1000;
    const time = seconds > 60 ? seconds / 60 : seconds;
    const rating = player.rating - player.oldRating;
    console.log(player);
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
        <View style={styles.rowContainer}>
          {!!player.oldRating && (
            <>
              <Label
                style={[
                  styles.playerRating,
                  { color: rating > 0 ? '#55a630' : '#e5383b' },
                ]}>
                {rating > 0 && '+'}
                {rating}
              </Label>
              <View style={styles.verticalSeparator} />
            </>
          )}
          <Label style={styles.playerTime}>
            {time.toFixed(1)}
            {seconds > 60 ? 'm' : 's'}
          </Label>
          <Icon size={15} name="timer" color="#ced4da" />
          <View style={styles.verticalSeparator} />
          <Label style={styles.playerScore}>{player.score}</Label>
          <Icon size={15} name="favorite" color="#ffba08" />
        </View>
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
