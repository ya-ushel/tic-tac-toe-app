import React, { useState, useEffect } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import { Label, SvgIcon, UserAvatar } from '../';
import { getAllRooms, joinRoom } from '../../actions/rooms';
import { socket } from 'utils';
import Button from '../Button';
import styles from './styles';
import { UserRoom } from './components/';

const RoomList = ({ setScreen, setGameId }) => {
  const [userRoom, setUserRoom] = useState(null);
  const [rooms, setRooms] = useState([]);

  const user = useSelector(state => state.user.data);
  useEffect(() => {
    getRooms();
    listenSocketEvents();

    return () => {
      unsubscribeSocketEvents();
    };
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

    socket.on('room.started', gameId => {
      getRooms();
    });
  };

  const unsubscribeSocketEvents = () => {
    socket.off('room.user-joined');
    socket.off('room.created');
    socket.off('room.user-left');
    socket.off('room.started');
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

  return (
    <View style={styles.container}>
      <UserRoom userRoom={userRoom} />
      <FlatList
        keyExtractor={(item, index) => item.name + index}
        ListHeaderComponent={() => (
          <Label style={styles.title}>All rooms</Label>
        )}
        data={rooms}
        renderItem={renderRoom}
      />
    </View>
  );
};

export default RoomList;
