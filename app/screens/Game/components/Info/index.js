import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';
import Sound from 'react-native-sound';

import { Button, Label, UserAvatar } from 'components';
import { socket } from 'utils';
import styles from './styles';

const noop = () => null;
const nextLevelSound = new Sound('next-level.mp3', Sound.MAIN_BUNDLE);
const thisIsGgSound = new Sound('this-is-gg.mp3', Sound.MAIN_BUNDLE);
const tipSound = new Sound('coins.mp3', Sound.MAIN_BUNDLE);

const Info = ({ data }) => {
  const tipAnimation = useRef(new Animated.Value(150)).current;

  useEffect(() => {
    listenSocketEvents();
  }, []);

  const listenSocketEvents = async () => {
    socket.on('player.tiped', onTiped);
  };

  const onTiped = () => {
    console.log('onTiped');
    const hideTip = () => {
      setTimeout(() => {
        Animated.timing(tipAnimation, {
          useNativeDriver: true,
          toValue: 150,
        }).start();
      }, 1000);
    };

    tipSound.play(noop);
    Animated.timing(tipAnimation, {
      useNativeDriver: true,
      toValue: 0,
    }).start(hideTip);
  };

  const onChatWheel = async sound => {
    switch (sound) {
      case 'this-is-gg': {
        thisIsGgSound.play(noop);
        break;
      }
      case 'next-level': {
        nextLevelSound.play(noop);
        break;
      }
    }
  };

  console.log('tipAnimation', tipAnimation);
  return (
    <View style={styles.container}>
      <Label style={styles.title}>Waiting for players...</Label>
      <View style={styles.chatWheels}>
        <Button
          opacity={0.5}
          style={styles.chatWheelsButton}
          onPress={() => onChatWheel('next-level')}>
          next level
        </Button>
        <Button
          opacity={0.5}
          style={styles.chatWheelsButton}
          onPress={() => onChatWheel('this-is-gg')}>
          GG
        </Button>
      </View>
      <Animated.View
        style={[
          styles.tipsContainer,
          { transform: [{ translateX: tipAnimation }] },
        ]}>
        <UserAvatar size={30} label="P" />
        <Label style={styles.tipsLabel}>50</Label>
        <UserAvatar size={30} label="P" />
      </Animated.View>
    </View>
  );
};

export default Info;
