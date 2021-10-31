import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';

import { Button, Label, Select, TextInput, SvgIcon } from 'components';
import { createRoom } from 'actions/rooms';
import { socket } from 'utils';
import styles from './styles';

const CreateRoom = () => {
  const user = useSelector(state => state.user.data);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const initialState = {
    name: `${user.nickname}'s room`,
    players: 2,
    timer: '-',
  };

  const [values, setValues] = useState(initialState);

  const onCreate = async () => {
    setLoading(true);

    await createRoom(values.name, {
      players: values.players,
      timer: values.timer,
    });

    socket.emit('room.created', values);

    setLoading(false);
    setModalVisible(false);
  };

  const onChange = (key, value) => {
    values[key] = value;
    setValues(values);
  };

  return (
    <>
      <View style={styles.container}>
        <Button
          onPress={() => setModalVisible(true)}
          style={styles.createButton}>
          Create room
        </Button>
      </View>
      <Modal
        onBackdropPress={() => setModalVisible(false)}
        style={{ justifyContent: 'flex-end' }}
        visible={modalVisible}
        hasBackdrop={true}>
        <View style={styles.modal}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              justifyContent: 'space-between',
              alignSelf: 'stretch',
              alignItems: 'center',
            }}>
            <Label style={styles.modalTitle}>Create room</Label>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <SvgIcon.Close height={16} width={16} />
            </TouchableOpacity>
          </View>
          <View style={styles.options}>
            <Label style={styles.optionLabel}>Name:</Label>
            <TextInput
              initialValue={`${user.nickname}'s room`}
              onChange={value => onChange('name', value)}
            />
          </View>
          <View style={styles.options}>
            <Label style={styles.optionLabel}>Players:</Label>
            <Select
              initialValue={2}
              variants={[2, 3, 5, 6]}
              onChange={value => onChange('players', value)}
            />
          </View>
          <View style={styles.options}>
            <Label style={styles.optionLabel}>Timer:</Label>
            <Select
              initialValue={'-'}
              variants={['-', 10, 20, 30]}
              onChange={value => onChange('timer', value)}
            />
          </View>
          <Button
            disabled={loading}
            onPress={onCreate}
            style={{
              marginTop: 50,
              alignSelf: 'flex-end',
              paddingHorizontal: 15,
              paddingVertical: 5,
            }}
            labelStyle={{ fontSize: 16 }}>
            Create
          </Button>
        </View>
      </Modal>
    </>
  );
};

export default CreateRoom;
