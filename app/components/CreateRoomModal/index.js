import React, { useState } from 'react';
import { TouchableOpacity, View, Switch, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { NeomorphBlur } from 'react-native-neomorph-shadows';

import {
  UserAvatar,
  Button,
  Label,
  Select,
  TextInput,
  SvgIcon,
  Icon,
} from 'components';
import { AddLocalPlayer } from './components';
import { editRoom, createRoom } from 'actions/rooms';
import { socket } from 'utils';
import { setDoc, getDoc } from 'firebase';
import store from 'store';
import { login } from 'store/redusers/userSlice';
import styles from './styles';

const CreateRoomModal = ({
  mode = 'create',
  modalVisible,
  setModalVisible,
  initialValues,
  roomId,
}) => {
  const user = useSelector(state => state.user.data);

  const initialState = {
    name: `${user?.nickname}'s room`,
    players: 2,
    timer: '-',
    localGame: false,
    boardSize: '6x6',
  };

  const [values, setValues] = useState(initialValues || initialState);
  const { localGame } = values;

  const [loading, setLoading] = useState(false);
  const localPlayers = user?.localPlayers || [];
  const selectedLocalPlayers = values.localGame
    ? localPlayers.slice(0, values.players - 1)
    : [];

  const createDisabled =
    loading || localGame
      ? selectedLocalPlayers.length !== values.players - 1
      : false;

  const onCreate = async () => {
    setLoading(true);

    await createRoom({
      name: values.name,
      players: values.players,
      timer: values.timer,
      boardSize: parseInt(values.boardSize, 10),
      localGame: values.localGame,
      localPlayers: selectedLocalPlayers,
    });

    socket.emit('room.created', values);

    setLoading(false);
    setModalVisible(false);
  };

  const onEdit = async () => {
    setLoading(true);

    const options = {
      name: values.name,
      players: values.players,
      timer: values.timer,
      boardSize: parseInt(values.boardSize, 10),
      localGame: values.localGame,
      localPlayers: selectedLocalPlayers,
    };

    await editRoom(roomId, options);

    socket.emit('room.created', values);

    setLoading(false);
    setModalVisible(false);
  };

  const onChange = (key, value) => {
    const newValues = { ...values };
    newValues[key] = value;
    console.log('values.name onChange', key, value);

    if (key === 'localGame') {
      newValues[key] = !values.localGame;
    }

    setValues(newValues);
  };

  const renderLocalPlayer = (player, index) => {
    const selected = index < values.players - 1;

    const onRemove = async () => {
      const localPlayers = user.localPlayers.filter(p => player.id !== p.id);

      await setDoc('users', user.id, { ...user, localPlayers });
      store.dispatch(login({ ...user, localPlayers }));
    };

    return (
      <View
        key={player.id}
        style={{
          marginHorizontal: 10,
          alignItems: 'center',
          opacity: selected ? 1 : 0.5,
        }}>
        <UserAvatar backgroundColor={player.avatarColor} />
        <Label style={{ marginTop: 10 }}>{player.nickname}</Label>
        <TouchableOpacity
          onPress={onRemove}
          style={{
            position: 'absolute',
            right: 0,
            top: -5,
            backgroundColor: '#f94144',
            borderRadius: 10,
            padding: 5,
          }}>
          <Icon name="cross" color="white" size={8} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
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
          <Label style={styles.modalTitle}>
            {mode === 'create' ? 'Create' : 'Edit'} room
          </Label>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <SvgIcon.Close height={16} width={16} />
          </TouchableOpacity>
        </View>
        <View style={styles.options}>
          <Label style={styles.optionLabel}>Name:</Label>
          <TextInput
            initialValue={values.name}
            onChangeText={value => onChange('name', value)}
          />
        </View>
        <View style={styles.options}>
          <Label style={styles.optionLabel}>Players:</Label>
          <View style={{ flex: 1, marginLeft: 70 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Select
                initialValue={values.players}
                variants={[2, 3, 4, 5, 6, 7, 8]}
                onChange={value => onChange('players', value)}
              />
            </ScrollView>
          </View>
        </View>
        <View style={styles.options}>
          <Label style={styles.optionLabel}>Timer:</Label>
          <Select
            initialValue={values.timer}
            variants={['-', 10, 20, 30]}
            onChange={value => onChange('timer', value)}
          />
        </View>
        <View style={styles.options}>
          <Label style={styles.optionLabel}>Board size:</Label>
          <Select
            initialValue={values.boardSize}
            variants={['6x6', '9x9', '12x12', '15x15']}
            onChange={value => onChange('boardSize', value)}
          />
        </View>
        <View style={styles.options}>
          <Label style={styles.optionLabel}>Local game:</Label>
          <Switch
            thumbColor={localGame ? 'white' : '#1d3557'}
            ios_backgroundColor="white"
            trackColor={{ false: 'white', true: '#1d3557' }}
            onValueChange={value => onChange('localGame', value)}
            value={localGame}
          />
        </View>
        {localGame && (
          <>
            <View style={[styles.options, { marginLeft: 0 }]}></View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ alignSelf: 'stretch' }}
              contentContainerStyle={[styles.options, { paddingVertical: 5 }]}>
              {localPlayers.map(renderLocalPlayer)}
              <AddLocalPlayer localPlayers={localPlayers} />
            </ScrollView>
          </>
        )}
        <Button
          disabled={createDisabled}
          onPress={mode === 'create' ? onCreate : onEdit}
          style={{
            marginTop: 100,
            alignSelf: 'flex-end',
            paddingHorizontal: 25,
            paddingVertical: 10,
          }}
          labelStyle={{ fontSize: 16 }}>
          {mode === 'create' ? 'Create' : 'Edit'}
        </Button>
      </View>
    </Modal>
  );
};

export default CreateRoomModal;
