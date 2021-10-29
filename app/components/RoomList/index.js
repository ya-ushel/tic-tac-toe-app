import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';

import Label from '../Label';
import { getAllRooms } from '../../actions/rooms';
import styles from './styles';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    const rooms = await getAllRooms();

    if (rooms.length) {
      setRooms(rooms);
    }
  };

  const renderRoom = ({ item }) => {
    return (
      <View style={styles.roomContainer}>
        <Label>{item.name}</Label>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Label style={styles.title}>Rooms</Label>
      <FlatList data={rooms} renderItem={renderRoom} />
    </View>
  );
};

export default RoomList;
