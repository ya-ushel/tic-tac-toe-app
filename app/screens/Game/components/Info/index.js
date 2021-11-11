import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
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
  gameId,
  currentPlayerId,
  gameStatus,
  boardScale,
  setBoardScale,
  players,
  localGame,
}) => {
  const user = useSelector(state => state.user.data);
  const tipAnimation = useRef(new Animated.Value(150)).current;
  const [tipData, setTipData] = useState({ from: '', to: '' });
  const currentPlayer = players.find(({ id }) => id === currentPlayerId);

  useEffect(() => {
    listenSocketEvents();
    return () => {
      unsubscribeSocketEvents();
    };
  }, []);

  const listenSocketEvents = async () => {
    socket.on('player.tiped', onTiped);
  };

  const unsubscribeSocketEvents = () => {
    socket.off('player.tiped');
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

  const onUndoMove = () => {
    socket.emit('player.undo-move', {
      id: currentPlayerId,
      gameId,
    });
  };

  const renderInfoLabel = () => {
    switch (gameStatus) {
      case 'created': {
        return <Label style={styles.title}>Waiting for players...</Label>;
      }
      case 'started': {
        return (
          <>
            {user.id === currentPlayerId && !localGame ? (
              <Label style={styles.title}>Your turn</Label>
            ) : (
              <Label style={[styles.title]}>
                <Label style={[styles.title, { color: currentPlayer.color }]}>
                  {currentPlayer.nickname}
                </Label>
                's turn
              </Label>
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
        <TouchableOpacity
          style={styles.chatWheelsButton}
          onPress={() => onScale(-0.25)}>
          <Icon name="minus" size={15} />
        </TouchableOpacity>
        <Label style={styles.boardScale}>
          {boardScale}
          {boardScale % 1 === 0 && '.0'}
        </Label>
        <TouchableOpacity
          style={styles.chatWheelsButton}
          onPress={() => onScale(0.25)}>
          <Icon name="plus" size={15} />
        </TouchableOpacity>
      </View>
      <View style={styles.chatWheels}>
        {/* <TouchableOpacity
          style={styles.chatWheelsButton}
          onPress={() => onChatWheel('next-level')}>
          <Icon name="sound" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chatWheelsButton}
          onPress={() => onChatWheel('this-is-gg')}>
          <Icon name="chat" size={25} />
        </TouchableOpacity> */}
        <Button onPress={onUndoMove}>Undo</Button>
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
