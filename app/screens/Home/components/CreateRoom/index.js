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
} from 'components';
import { AddLocalPlayer } from './components';
import { createRoom } from 'actions/rooms';
import { socket } from 'utils';
import styles from './styles';

const CreateRoom = () => {
  const user = useSelector(state => state.user.data);

  const initialState = {
    name: `${user?.nickname}'s room`,
    players: 2,
    timer: '-',
    localGame: false,
    boardSize: '6x6',
  };

  const [values, setValues] = useState(initialState);
  const { localGame } = values;

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const localPlayers = user?.localPlayers || [];
  const selectedLocalPlayers = values.localGame
    ? localPlayers.slice(0, values.players - 1)
    : [];
  console.log(selectedLocalPlayers);
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

  const onChange = (key, value) => {
    const newValues = { ...values };
    newValues[key] = value;

    if (key === 'localGame') {
      newValues[key] = !values.localGame;
    }

    setValues(newValues);
  };

  const renderLocalPlayer = (player, index) => {
    const selected = index < values.players - 1;
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
      </View>
    );
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
              initialValue={`${user?.nickname}'s room`}
              onChange={value => onChange('name', value)}
            />
          </View>
          <View style={styles.options}>
            <Label style={styles.optionLabel}>Players:</Label>
            <ScrollView
              horizontal
              style={{ marginLeft: 50 }}
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'flex-end',
              }}
              showsHorizontalScrollIndicator={false}>
              <Select
                initialValue={2}
                variants={[2, 3, 4, 5, 6, 7, 8]}
                onChange={value => onChange('players', value)}
              />
            </ScrollView>
          </View>
          <View style={styles.options}>
            <Label style={styles.optionLabel}>Timer:</Label>
            <Select
              initialValue={'-'}
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
              onValueChange={value => onChange('localGame', value)}
              value={localGame}
            />
          </View>
          {localGame && (
            <>
              <View style={[styles.options, { marginLeft: 0 }]}></View>
              <ScrollView
                horizontal
                style={{ alignSelf: 'stretch' }}
                contentContainerStyle={[
                  styles.options,
                  { paddingVertical: 5 },
                ]}>
                {localPlayers.map(renderLocalPlayer)}
                <AddLocalPlayer localPlayers={localPlayers} />
              </ScrollView>
            </>
          )}
          <Button
            disabled={createDisabled}
            onPress={onCreate}
            style={{
              marginTop: 100,
              alignSelf: 'flex-end',
              paddingHorizontal: 25,
              paddingVertical: 10,
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
