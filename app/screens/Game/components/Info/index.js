import React, { useState, useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';
import Sound from 'react-native-sound';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Label, UserAvatar, SvgIcon, Icon } from 'components';
import { socket } from 'utils';
import styles from './styles';

const noop = () => null;
const nextLevelSound = new Sound('next-level.mp3', Sound.MAIN_BUNDLE);
const thisIsGgSound = new Sound('this-is-gg.mp3', Sound.MAIN_BUNDLE);
const tipSound = new Sound('coins.mp3', Sound.MAIN_BUNDLE);

const Info = ({
  data,
  currentPlayerId,
  gameStatus,
  boardScale,
  setBoardScale,
  players,
}) => {
  const user = useSelector(state => state.user.data);
  const tipAnimation = useRef(new Animated.Value(150)).current;
  const [tipData, setTipData] = useState({ from: '', to: '' });
  const currentPlayer = players.find(({ id }) => id === currentPlayerId);

  useEffect(() => {
    listenSocketEvents();
  }, []);

  const listenSocketEvents = async () => {
    socket.on('player.tiped', onTiped);
  };

  const onTiped = data => {
    setTipData(data);

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

  const onScale = value => {
    boardScale = boardScale + value;
    setBoardScale(boardScale);
  };

  const renderInfoLabel = () => {
    switch (gameStatus) {
      case 'created': {
        return <Label style={styles.title}>Waiting for players...</Label>;
      }
      case 'started': {
        return (
          <>
            {user.id === currentPlayerId ? (
              <Label style={styles.title}>Your turn</Label>
            ) : (
              <Label style={styles.title}>{currentPlayer.nickname}s turn</Label>
            )}
          </>
        );
      }
    }
  };

  const tipPlayer = players?.find(({ id }) => id === tipData.from);
  const tipedPlayer = players?.find(({ id }) => id === tipData.to);

  return (
    <View style={styles.container}>
      {renderInfoLabel()}
      <View style={styles.scale}>
        <Button
          opacity={0.7}
          style={styles.chatWheelsButton}
          onPress={() => onScale(-0.25)}>
          -
        </Button>
        <Button
          opacity={0.7}
          style={styles.chatWheelsButton}
          onPress={() => onScale(0.25)}>
          +
        </Button>
      </View>
      <View style={styles.chatWheels}>
        <Button
          opacity={0.7}
          style={styles.chatWheelsButton}
          onPress={() => onChatWheel('next-level')}>
          next level
        </Button>
        <Button
          opacity={0.7}
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
        <UserAvatar
          size={30}
          label="P"
          backgroundColor={tipPlayer?.avatarColor}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Label style={styles.tipsLabel}>50</Label>
          {/* <Icon width={50} heigth={50} /> */}
        </View>
        <UserAvatar
          size={30}
          label="P"
          backgroundColor={tipedPlayer?.avatarColor}
        />
      </Animated.View>
    </View>
  );
};

export default Info;
