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
import Button from '../Button';
import styles from './styles';

const RoomList = () => {
  const [userRoom, setUserRoom] = useState(null);
  const [userRoomExpanded, setUserRoomExpanded] = useState([]);
  const [rooms, setRooms] = useState([]);

  const user = useSelector(state => state.user.data);

  useEffect(() => {
    getRooms();
  }, []);

  const toggleUserRoomExpanded = value => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setUserRoomExpanded(value);
  };

  const getRooms = async () => {
    const rooms = await getAllRooms();
    const isUserRoom = r => r.playerList.indexOf(user.id) !== -1;
    const userRoom = rooms.find(r => isUserRoom(r));

    if (rooms.length) {
      setRooms(rooms.filter(r => !isUserRoom(r)));
    }

    if (userRoom) {
      setUserRoom(userRoom);
    } else {
      setUserRoom(null);
    }
  };

  const renderPlayer = player => {
    return (
      <UserAvatar
        label="P"
        style={styles.roomPlayerAvatar}
        labelStyle={{ fontSize: 12 }}
        size={25}
      />
    );
  };

  const renderRoom = ({ item }) => {
    const onJoin = async () => {
      await joinRoom(item.id);
      await getRooms();
    };

    return (
      <View style={styles.roomContainer}>
        <View>
          <Label style={styles.roomName}>{item.name}</Label>

          <ScrollView style={{ width: '85%', marginTop: 10 }} horizontal>
            {item.playerList.map(p => renderPlayer(p))}
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
          <Button onPress={onJoin}>Join</Button>
        </View>
      </View>
    );
  };

  const renderUserRoom = () => {
    const onLeave = async () => {
      await leaveRoom(userRoom.id);
      await getRooms();
    };

    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: 20,
          }}>
          <Label style={styles.yourRoomTitle}>Your room</Label>
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
        <View style={styles.roomContainerShadow}>
          {userRoomExpanded && (
            <View style={[styles.roomContainer, { borderBottomWidth: 0 }]}>
              <View>
                <Label style={styles.roomName}>{userRoom.name}</Label>

                <ScrollView style={{ width: '85%', marginTop: 10 }} horizontal>
                  {userRoom.playerList.map(p => renderPlayer(p))}
                </ScrollView>
              </View>
              <View style={{ justifyContent: 'space-between' }}>
                <View style={styles.roomSettings}>
                  <Label style={styles.roomPlayers}>2</Label>
                  <SvgIcon.Players width={20} height={20} />
                </View>
                <Button onPress={onLeave}>Leave</Button>
              </View>
            </View>
          )}
          <View style={styles.shadow} />
        </View>
      </>
    );
  };

  console.log('userRoom', userRoom);

  return (
    <View style={styles.container}>
      {userRoom && <View>{renderUserRoom()}</View>}
      <FlatList
        ListHeaderComponent={() => <Label style={styles.title}>Rooms</Label>}
        data={rooms}
        renderItem={renderRoom}
      />
    </View>
  );
};

export default RoomList;
