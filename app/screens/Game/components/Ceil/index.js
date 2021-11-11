import React, { useMemo, useEffect, memo } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';

import { Icon } from 'components';
import DickPick from 'assets/shapes/hui.jpeg';
import styles from './styles';
const nextLevelSound = new Sound('next-level.mp3', Sound.MAIN_BUNDLE);

const pingSound = new Sound('ping.mp3', Sound.MAIN_BUNDLE);
const Ceil = ({ myPlayerId, ceil, width, players, makeMove, boardSize }) => {
  let margin = 6;
  margin = boardSize === 9 ? 7 : margin;
  margin = boardSize === 6 ? 8 : margin;
  const size = width / boardSize - margin;
  //   const x = ceil.index % boardSize;
  //   const y = parseInt(ceil.index / boardSize);
  const playerCeil = players.find(({ shape }) => ceil.value === shape);
  const freeCeil = !ceil.value;
  if (ceil.matched) {
    console.log('playerCeil', playerCeil);
  }

  const onPress = () => {
    if (!freeCeil) {
      if (pingSound.isPlaying) {
        pingSound.stop();
      }
      pingSound.play(() => null);
      return;
    }

    makeMove(myPlayerId);
  };

  const renderShape = ({ index, value }, matched, isDick) => {
    let shapeMargin = 6;
    shapeMargin = boardSize === 15 ? 2 : shapeMargin;
    shapeMargin = boardSize === 9 ? 7 : shapeMargin;
    shapeMargin = boardSize === 6 ? 8 : shapeMargin;

    let iconSize = size - shapeMargin; // - 10 ipad
    iconSize = value === 'square' ? iconSize - 6 : iconSize;
    iconSize = value === 'triangle' ? iconSize + 10 : iconSize;
    iconSize = value === 'cross' ? iconSize - 5 : iconSize;
    iconSize = value === 'circle' ? iconSize - 5 : iconSize;
    iconSize = value === 'triangle-down' ? iconSize - 4 : iconSize;
    iconSize = value === 'plus' ? iconSize - 6 : iconSize;
    iconSize = value === 'hexagon' ? iconSize + 2 : iconSize;
    iconSize = value === 'romb' ? iconSize + 4 : iconSize;

    const player = players.find(({ shape }) => shape === value);

    // return <Label>{shape}</Label>;

    if (isDick && value) {
      return (
        <Image
          source={DickPick}
          style={{ width: size, height: size, borderRadius: 5 }}
        />
      );
    }

    if (value) {
      return (
        <Icon
          name={value}
          color={matched ? 'white' : player.color}
          size={iconSize}
        />
      );
    }
  };
  if (ceil.possibleMatch) {
    console.log('possibleMatch', ceil);
  }
  return (
    <TouchableOpacity
      // disabled={ceil.value}
      key={ceil.index}
      onPress={onPress}
      style={[
        styles.ceil,
        {
          backgroundColor: ceil.matched ? playerCeil?.color : 'white',
          height: size,
          width: size,
          // borderWidth: ceil.possibleMatch ? 5 : 0,
          // borderColor: ceil.possibleMatchColor,
        },
      ]}>
      {!!ceil && renderShape(ceil, ceil.matched, false)}
    </TouchableOpacity>
  );
};

function areEqual(prevProps, nextProps) {
  return (
    prevProps?.ceil?.value === nextProps?.ceil?.value &&
    prevProps?.ceil?.matched === nextProps?.ceil?.matched &&
    prevProps?.myPlayerId === nextProps?.myPlayerId
  );
}

export default memo(Ceil, areEqual);
