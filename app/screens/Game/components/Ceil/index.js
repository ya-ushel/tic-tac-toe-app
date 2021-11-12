import React, { useState, useEffect, memo } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';
import { Shadow } from 'react-native-neomorph-shadows';

import { Icon } from 'components';
import DickPick from 'assets/shapes/hui.jpeg';
import styles from './styles';
const nextLevelSound = new Sound('next-level.mp3', Sound.MAIN_BUNDLE);

const pingSound = new Sound('ping.mp3', Sound.MAIN_BUNDLE);
const Ceil = ({ myPlayerId, ceil, width, players, makeMove, boardSize }) => {
  const [pressing, setPressing] = useState(false);
  let margin = 6;
  margin = boardSize === 9 ? 7 : margin;
  margin = boardSize === 6 ? 8 : margin;
  margin = boardSize === 3 ? 20 : margin;

  const size = width / boardSize - margin;
  //   const x = ceil.index % boardSize;
  //   const y = parseInt(ceil.index / boardSize);
  const playerCeil = players.find(({ shape }) => ceil.value === shape);
  const freeCeil = !ceil.value;

  if (ceil.matched) {
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
    shapeMargin = boardSize === 15 ? 6 : shapeMargin;
    shapeMargin = boardSize === 9 ? 7 : shapeMargin;
    shapeMargin = boardSize === 6 ? 8 : shapeMargin;

    let iconSize = size - shapeMargin; // - 10 ipad
    iconSize = value === 'square' ? iconSize - 6 : iconSize;
    iconSize = value === 'triangle' ? iconSize + 8 : iconSize;
    iconSize = value === 'cross' ? iconSize - 7 : iconSize;
    iconSize = value === 'circle' ? iconSize - 5 : iconSize;
    iconSize = value === 'triangle-down' ? iconSize - 4 : iconSize;
    iconSize = value === 'plus' ? iconSize - 6 : iconSize;
    iconSize = value === 'hexagon' ? iconSize + 2 : iconSize;
    iconSize = value === 'romb' ? iconSize + 4 : iconSize;

    iconSize =
      value === 'triangle' && boardSize === 15 ? iconSize - 6 : iconSize;

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
    // console.log('possibleMatch', ceil);
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      // disabled={ceil.value}
      key={ceil.index}
      onPress={onPress}
      onPressIn={() => {
        console.log('onPressIn');
        setPressing(true);
      }}
      onPressOut={() => {
        console.log('onPressOut');
        setPressing(false);
      }}
      style={[
        styles.ceil,
        {
          height: size,
          width: size,
          // borderWidth: ceil.possibleMatch ? 5 : 0,
          // borderColor: ceil.possibleMatchColor,
        },
      ]}>
      <View pointerEvents="none">
        <Shadow
          pointerEvents="none"
          inner
          style={[
            styles.ceilShadow,
            {
              shadowOpacity: pressing && !ceil.value ? 1 : 0,
              backgroundColor: ceil.matched ? playerCeil?.color : 'white',
              width: size,
              height: size,
            },
          ]}>
          {!!ceil && renderShape(ceil, ceil.matched, false)}
        </Shadow>
      </View>
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
