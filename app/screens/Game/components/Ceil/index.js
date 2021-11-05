import React, { useMemo, useEffect, memo } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';

import { Icon } from 'components';
import DickPick from 'assets/shapes/hui.jpeg';
import styles from './styles';

const pingSound = new Sound('ping.mp3', Sound.MAIN_BUNDLE);
const Ceil = ({ myPlayerId, ceil, width, players, makeMove, boardSize }) => {
  const size = width / boardSize - 6;
  //   const x = ceil.index % boardSize;
  //   const y = parseInt(ceil.index / boardSize);
  const playerCeil = players.find(({ shape }) => ceil.value === shape);

  if (ceil.matched) {
    console.log('playerCeil', playerCeil);
  }

  const onPress = () => {
    if (false) {
      if (pingSound.isPlaying) {
        pingSound.stop();
      }
      pingSound.play(() => null);
      return;
    }

    makeMove(myPlayerId);
  };

  const renderShape = ({ index, value }, matched, isDick) => {
    let iconSize = size - 10; // - 10 ipad
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
      return <Image source={DickPick} style={{ width: size, height: size }} />;
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
          borderWidth: ceil.matched ? 0 : 0,
          borderColor: playerCeil?.color || 'white',
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
