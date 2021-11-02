import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Shadow } from 'react-native-neomorph-shadows';
import Sound from 'react-native-sound';

import { SvgIcon } from 'components';
import DickPick from 'assets/shapes/hui.jpeg';
import styles from './styles';

const AnimatedShadow = Animated.createAnimatedComponent(Shadow);
const { width } = Dimensions.get('screen');
const pingSound = new Sound('ping.mp3', Sound.MAIN_BUNDLE);

const Board = ({ currentPlayerId, data }) => {
  const user = useSelector(state => state.user.data);
  const userTurn = user.id === currentPlayerId;
  const [board, setBoard] = useState(new Array(225).fill(0));
  const shadowColors = { start: '#cdb4db', end: '#a2d2ff' };
  // const shadowColors = { start: '#f72585', end: '#3a0ca3' };

  const animation = useRef(new Animated.Value(0)).current;

  const shadowColorStyle = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [shadowColors.start, shadowColors.end],
  });
  const shadowRadiusStyle = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [35, 25],
  });

  const shadowStyle = {
    ...styles.shadow,
    shadowColor: shadowColorStyle,
    shadowRadius: shadowRadiusStyle,
    width,
    height: width,
  };

  useEffect(() => {
    startAnimation(1);
  }, []);

  const startAnimation = value => {
    Animated.timing(animation, {
      toValue: value,
      useNativeDriver: false,
      duration: 5000,
    }).start(() => startAnimation(value === 1 ? 0 : 1));
  };

  const renderShape = isDick => {
    const size = width / 15 - 6;
    const shapeSize = size - 6;

    if (isDick) {
      return <Image source={DickPick} style={{ width: size, height: size }} />;
    }

    return <SvgIcon.Cross height={shapeSize} width={shapeSize} />;
  };

  const renderCeil = (ceil, index) => {
    const size = width / 15 - 6;

    const onPress = () => {
      if (!userTurn) {
        pingSound.play(() => null);
        return;
      }

      const newBoard = [...board];
      newBoard[index] = newBoard[index] === 1 ? 0 : 1;

      setBoard(newBoard);
    };

    return (
      <TouchableOpacity
        key={index}
        onPress={onPress}
        style={[styles.ceil, { height: size, width: size }]}>
        {!!ceil && renderShape(false)}
      </TouchableOpacity>
    );
  };

  return (
    <AnimatedShadow style={shadowStyle}>
      <View style={[styles.container, { height: width }]}>
        <View style={styles.board}>
          {board.map((c, i) => renderCeil(c, i))}
        </View>
      </View>
    </AnimatedShadow>
  );
};

export default Board;
