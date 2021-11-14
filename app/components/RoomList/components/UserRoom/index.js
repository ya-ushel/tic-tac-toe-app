import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
} from 'react-native';
import { useSelector } from 'react-redux';

import { socket } from 'utils';
import Navigator from 'navigation';
import {
  CreateRoomModal,
  Label,
  Button,
  SvgIcon,
  UserAvatar,
} from 'components';
import { leaveRoom } from '../../../../actions/rooms';

import styles from './styles';

const UserRoom = ({ userRoom }) => {
  const user = useSelector(state => state.user.data);
  const [userRoomExpanded, setUserRoomExpanded] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  if (!userRoom) return null;

  const host = userRoom.hostId === user.id;
  const started = userRoom.status === 'started';
  const localGame = userRoom.options.localGame;
  const localPlayers = userRoom.options.localPlayers || [];
  const players = [...userRoom.users, ...localPlayers];
  const optionsValues = {
    ...userRoom.options,
    boardSize: `${userRoom.options.boardSize}x${userRoom.options.boardSize}`,
  };

  const startDisabled =
    !localGame && userRoom.options.players !== userRoom.users.length;

  const onJoin = async () => {
    Navigator.push(Navigator.activeComponentId, 'GameScreen', {
      gameId: userRoom.gameId,
    });
  };

  const toggleUserRoomExpanded = value => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setUserRoomExpanded(value);
  };

  const onLeave = async () => {
    socket.emit('room.leave', {
      gameId: userRoom.gameId,
      roomId: userRoom.id,
    });
    await leaveRoom(userRoom.id);
    console.log('userRoom.id userRoom.id', userRoom.id);
  };

  const onStart = async () => {
    socket.emit('room.start-game', { roomId: userRoom.id });
  };

  const renderPlayer = player => {
    return (
      <UserAvatar
        key={player.id}
        label={player.nickname?.length ? player.nickname[0] : 'P'}
        backgroundColor={player.avatarColor}
        style={styles.roomPlayerAvatar}
        labelStyle={{ fontSize: 12 }}
        size={35}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Label style={styles.yourRoomTitle}>{userRoom.name}</Label>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {userRoomExpanded ? (
            <TouchableOpacity onPress={() => toggleUserRoomExpanded(false)}>
              <SvgIcon.ArrowUp width={25} height={25} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => toggleUserRoomExpanded(true)}>
              <SvgIcon.ArrowDown width={25} height={25} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.roomContainerShadow}>
        {userRoomExpanded && (
          <>
            <View
              style={[
                styles.roomContainer,
                { borderBottomWidth: 0, paddingBottom: 10 },
              ]}>
              <View style={{ width: '65%' }}>
                {/* <Label style={styles.roomName}>{userRoom.name}</Label> */}

                <ScrollView style={{ marginTop: 0 }} horizontal>
                  {players.map(p => renderPlayer(p))}
                </ScrollView>
              </View>
              <View style={{ justifyContent: 'space-between' }}>
                <View style={styles.roomSettings}>
                  <Label style={styles.roomPlayers}>
                    {userRoom.options?.players || 2}
                  </Label>
                  <SvgIcon.Players width={20} height={20} />
                </View>
              </View>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 20,
                marginBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Button
                  color="red"
                  style={{ marginRight: 10 }}
                  onPress={onLeave}>
                  Leave
                </Button>
                {host && !started && (
                  <Button
                    color="yellow"
                    style={{ marginRight: 15 }}
                    onPress={() => setModalVisible(true)}>
                    Edit
                  </Button>
                )}
              </View>
              {started && (
                <Button style={styles.startButton} onPress={onJoin}>
                  Join
                </Button>
              )}
              {host && !started && (
                <Button
                  disabled={startDisabled}
                  style={styles.startButton}
                  onPress={onStart}>
                  Start game
                </Button>
              )}
            </View>
          </>
        )}
        {/* <View style={styles.shadow} /> */}
      </View>
      <CreateRoomModal
        mode="edit"
        roomId={userRoom.id}
        initialValues={optionsValues}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default UserRoom;
