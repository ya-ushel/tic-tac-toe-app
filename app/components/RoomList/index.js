import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

import { getAllRooms } from '../../actions/rooms';
import styles from './styles';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    const rooms = await getAllRooms();
    setRooms(rooms);
  };

  const renderRoom = ({ item }) => {
    return (
      <View style={styles.roomContainer}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rooms</Text>
      <FlatList data={rooms} renderItem={renderRoom} />
    </View>
  );
};

export default RoomList;
