import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { useSelector } from 'react-redux';

import { Label, SvgIcon, UserAvatar } from '../';
import { getAllRooms, leaveRoom, joinRoom } from '../../actions/rooms';
import { socket } from 'utils';
import Button from '../Button';
import styles from './styles';

const RoomList = ({ setScreen, setGameId }) => {
  const [userRoom, setUserRoom] = useState(null);
  const [userRoomExpanded, setUserRoomExpanded] = useState([]);
  const [rooms, setRooms] = useState([]);

  const user = useSelector(state => state.user.data);
  useEffect(() => {
    getRooms();
    listenSocketEvents();
  }, []);

  const listenSocketEvents = async () => {
    socket.on('room.created', data => {
      console.log('room.created', data);
      getRooms();
    });

    socket.on('room.user-joined', data => {
      console.log('room.player-joined', data);
      getRooms();
    });

    socket.on('room.user-left', data => {
      console.log('room.user-left', data);
      getRooms();
    });
  };

  const toggleUserRoomExpanded = value => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setUserRoomExpanded(value);
  };

  const getRooms = async () => {
    const rooms = await getAllRooms();

    const isUserRoom = r => r.users.find(p => p.id === user.id);
    const userRoom = rooms.find(r => isUserRoom(r));

    // setRooms(rooms);
    setRooms(rooms.filter(r => !isUserRoom(r) && r.status !== 'started'));

    if (userRoom) {
      setUserRoom(userRoom);
    } else {
      setUserRoom(null);
    }
  };

  const renderPlayer = player => {
    return (
      <UserAvatar
        key={player.id}
        label="P"
        backgroundColor={player.avatarColor}
        style={styles.roomPlayerAvatar}
        labelStyle={{ fontSize: 12 }}
        size={25}
      />
    );
  };

  const renderRoom = ({ item }) => {
    const isUserRoom = item.id === userRoom?.id;
    const onJoin = async () => {
      await joinRoom(item.id);
      socket.emit('room.user-join', user);
    };

    return (
      <View style={styles.roomContainer}>
        <View>
          <Label style={styles.roomName}>{item.name}</Label>

          <ScrollView style={{ width: '85%', marginTop: 10 }} horizontal>
            {item.users.map(p => renderPlayer(p))}
          </ScrollView>
        </View>
        <View style={{ justifyContent: 'space-between' }}>
          <View style={styles.roomSettings}>
            <Label style={styles.roomPlayers}>
              {item.options?.players || 2}
            </Label>
            <SvgIcon.Players width={20} height={20} />
          </View>
          {/* <View style={styles.roomSettings}>
            <Label style={styles.roomPlayers}>2</Label>
            <SvgIcon.Timer width={20} height={20} />
          </View> */}
          {isUserRoom ? (
            <Label>Your room</Label>
          ) : (
            <Button onPress={onJoin}>Join</Button>
          )}
        </View>
      </View>
    );
  };

  const renderUserRoom = () => {
    const host = userRoom.hostId === user.id;
    const started = userRoom.status === 'started';
    const localGame = userRoom.options.localGame;
    const localPlayers = userRoom.options.localPlayers || [];
    const players = [...userRoom.users, ...localPlayers];

    const startDisabled =
      !localGame && userRoom.options.players !== userRoom.users.length;

    console.log(userRoom);
    const onJoin = async () => {
      setGameId(userRoom.gameId);
      setScreen('game');
    };

    const onLeave = async () => {
      await leaveRoom(userRoom.id);
      socket.emit('room.leave', user);
    };

    const onStart = async () => {
      socket.emit('room.start-game', { roomId: userRoom.id });
    };

    return (
      <>
        <View
          style={{
            alignSelf: 'stretch',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 20,
          }}>
          <Label style={styles.yourRoomTitle}>
            Your {started ? 'game' : 'room'}
          </Label>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button color="red" style={{ marginRight: 15 }} onPress={onLeave}>
              Leave
            </Button>
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
            <View
              style={[
                styles.roomContainer,
                { borderBottomWidth: 0, paddingBottom: 10 },
              ]}>
              <View style={{ width: '65%' }}>
                <Label style={styles.roomName}>{userRoom.name}</Label>

                <ScrollView style={{ marginTop: 10 }} horizontal>
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

                <View style={{ alignItems: 'flex-end' }}>
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
              </View>
            </View>
          )}
          <View style={styles.shadow} />
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {userRoom && <View>{renderUserRoom()}</View>}
      <FlatList
        keyExtractor={(item, index) => item.name + index}
        ListHeaderComponent={() => <Label style={styles.title}>Rooms</Label>}
        data={rooms}
        renderItem={renderRoom}
      />
    </View>
  );
};

export default RoomList;
