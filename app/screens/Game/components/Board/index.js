import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Shadow } from 'react-native-neomorph-shadows';
import Sound from 'react-native-sound';

import { Label, Icon } from 'components';
import { socket } from 'utils';
import DickPick from 'assets/shapes/hui.jpeg';
import styles from './styles';

const AnimatedShadow = Animated.createAnimatedComponent(Shadow);
const { width } = Dimensions.get('screen');
const pingSound = new Sound('ping.mp3', Sound.MAIN_BUNDLE);

const Board = ({
  gameId,
  currentPlayerId,
  boardSize,
  data,
  boardScale = 1,
  players,
}) => {
  const user = useSelector(state => state.user.data);
  const userTurn = user.id === currentPlayerId;
  const [board1, setBoard] = useState(new Array(225).fill(0));
  const shadowColors = { start: '#cdb4db', end: '#a2d2ff' };
  // const shadowColors = { start: '#f72585', end: '#3a0ca3' };
  const myPlayer = players.find(({ id }) => id === user.id);

  const animation = useRef(new Animated.Value(0)).current;

  const shadowColorStyle = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [shadowColors.start, shadowColors.end],
  });
  const shadowRadiusStyle = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [35, 25],
  });

  useEffect(() => {
    const size = 15;
    const data = new Array(size * size);

    startAnimation(1);
    for (let index = 0; index < data.length; index++) {
      data[index] = index;
    }
    setBoard(data);
  }, []);

  const startAnimation = value => {
    Animated.timing(animation, {
      toValue: value,
      useNativeDriver: false,
      duration: 5000,
    }).start(() => startAnimation(value === 1 ? 0 : 1));
  };

  const renderShape = ({ index, value }, matched, isDick) => {
    const size = width / 15 - 6;

    const player = players.find(({ shape }) => shape === value);
    // console.log('shape', value);
    // return <Label>{shape}</Label>;

    if (isDick && value) {
      return <Image source={DickPick} style={{ width: size, height: size }} />;
    }

    if (value) {
      return <Icon name={value} color={matched ? 'white' : player.color} />;
    }
  };

  const renderCeil = (ceil, index) => {
    const size = width / 15 - 6;
    const x = ceil.index % boardSize;
    const y = parseInt(ceil.index / boardSize);
    const playerCeil = players.find(({ shape }) => ceil.value === shape);

    if (ceil.matched) {
      console.log(playerCeil);
    }
    const onPress = () => {
      if (!userTurn) {
        if (pingSound.isPlaying) {
          pingSound.stop();
        }
        pingSound.play(() => null);
        return;
      }

      // console.log('make move', calculateScore(myPlayer.shape, ceil.index));
      socket.emit('player.make-move', {
        id: user.id,
        gameId,
        ceilIndex: ceil.index,
      });
    };

    const shadowStyle = {
      ...styles.shadow,
      shadowColor: playerCeil?.color,
      shadowRadius: 5,
      width: size,
      height: size,
      margin: 2,
      shadowOpacity: ceil.matched ? 1 : 0,
    };

    return (
      // <AnimatedShadow key={index} style={shadowStyle}>
      <TouchableOpacity
        disabled={!!ceil.value}
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
      // </AnimatedShadow>
    );
  };

  return (
    // <AnimatedShadow style={shadowStyle}>
    <View style={[styles.container, { height: width }]}>
      {/* <ScrollView scrollEnabled={boardScale !== 1}> */}
      {/* <ScrollView
          scrollEnabled={boardScale !== 1}
          horizontal
          style={{ paddingHorizontal: 0 }}
          contentContainerStyle={{
            height: width,
            maxWidth: width - 20,
          }}> */}
      <View style={[styles.board, { transform: [{ scale: boardScale }] }]}>
        {data.sort((a, b) => a.index - b.index).map((c, i) => renderCeil(c, i))}
      </View>
      {/* </ScrollView>
      </ScrollView> */}
    </View>
    // </AnimatedShadow>
  );
};

export default Board;
