import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { uid } from 'uid';
import { useSelector } from 'react-redux';

import { Label, UserAvatar, Button } from 'components';
import config from 'config';
import store from 'store';
import { login } from 'store/redusers/userSlice';

import { setDoc, getDoc } from '../../../../../../firebase';

const AddLocalPlayer = ({ localPlayers, nickname }) => {
  const avatarColors = config.avatarColors;
  const [selectedColor, setSelectedColor] = useState(avatarColors[0]);
  const user = useSelector(state => state.user.data);
  const defaultNickname = `Player ${localPlayers.length + 1}`;

  const onChangedColor = () => {
    const index =
      index === avatarColors.length - 1
        ? 0
        : avatarColors.indexOf(selectedColor);
    setSelectedColor(avatarColors[index + 1]);
  };

  const onAdd = async () => {
    const getRandom = (min, max) =>
      Math.floor(Math.random() * (min - max + 1) + max);

    const player = {
      id: uid(),
      createdAt: Date.now(),
      avatarColor: selectedColor,
      nickname: nickname || defaultNickname,
    };

    const userDocument = await (await getDoc('users', user.id)).data();
    const localPlayers = userDocument.localPlayers
      ? [...userDocument.localPlayers, player]
      : [player];

    userDocument.localPlayers = localPlayers;

    await setDoc('users', userDocument.id, userDocument);
    store.dispatch(login(userDocument));
  };

  return (
    <View
      style={{
        alignItems: 'center',
        padding: 10,
        marginLeft: 20,
        borderWidth: 2,
        borderRadius: 3,
      }}>
      <TouchableOpacity onPress={onChangedColor}>
        <UserAvatar label="P" backgroundColor={selectedColor} />
      </TouchableOpacity>
      <Label style={{ marginVertical: 5, marginBottom: 15 }}>
        {nickname || defaultNickname}
      </Label>
      <Button onPress={onAdd}>Add</Button>
    </View>
  );
};

export default AddLocalPlayer;
