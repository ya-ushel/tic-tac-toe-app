import React, { useEffect, useState } from 'react';
import { Touchable, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setDoc, signInAnonymously } from 'firebase';
import auth from '@react-native-firebase/auth';

import { login, update } from 'store/redusers/userSlice';
import { TextInput, Button, Label, UserAvatar } from 'components';
import { socket } from 'utils';
import Navigator from 'navigation';
import config from 'config';
import store from 'store';

import { Header } from './components';
import styles from './styles';

const ProfileScreen = ({}) => {
  const avatarColors = config.avatarColors;

  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState(user.nickname);
  const [selectedColor, setSelectedColor] = useState(user.avatarColor);

  useEffect(() => {
    setNickname(user.nickname);
    setSelectedColor(user.avatarColor);
  }, [user]);

  const onLogout = async () => {
    await auth().signOut();
    const { user: newUser } = await signInAnonymously();
    console.log('onLogout', newUser);
    const getRandom = (min, max) =>
      Math.floor(Math.random() * (min - max + 1) + max);

    const userDocument = {
      id: newUser.uid,
      createdAt: Date.now(),
      avatarColor:
        config.avatarColors[getRandom(0, config.avatarColors.length)],
      nickname: 'Player' + getRandom(1000, 9999),
      coins: 500,
      experience: 0,
      rating: 1000,
      gameHistory: [],
    };

    await setDoc('users', userDocument.id, userDocument);
    store.dispatch(login(userDocument));
  };

  const onEditPress = async () => {
    if (!editing) {
      setEditing(true);
      return;
    }

    const updatedUser = { ...user };

    updatedUser.avatarColor = selectedColor;
    updatedUser.nickname = nickname;

    await setDoc('users', user.id, updatedUser);
    store.dispatch(update(updatedUser));

    setEditing(false);
  };

  const onCancelEdit = () => {
    setNickname(user.nickname);
    setSelectedColor(user.avatarColor);
    setEditing(false);
  };

  const onChangedColor = () => {
    const index = avatarColors.indexOf(selectedColor);
    setSelectedColor(avatarColors[index + 1]);
  };

  return (
    <View style={{ flex: 1, marginBottom: 30 }}>
      <Header />
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity disabled={!editing} onPress={onChangedColor}>
            <UserAvatar
              backgroundColor={selectedColor}
              label={user?.nickname}
              size={80}
            />
          </TouchableOpacity>

          <TextInput
            style={[styles.nickname, !editing && { borderBottomWidth: 0 }]}
            value={nickname}
            onChangeText={setNickname}
            editable={editing}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginVertical: 10,
            marginTop: 30,
          }}>
          {editing && (
            <Button
              onPress={onCancelEdit}
              color="red"
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginRight: 10,
              }}>
              Cancel
            </Button>
          )}
          <Button
            onPress={onEditPress}
            style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
            {editing ? 'Save' : 'Edit'}
          </Button>
        </View>
        <View
          style={{
            marginTop: 20,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: '#e5e5e5',
            paddingVertical: 10,
          }}>
          <View style={{ marginVertical: 3, flexDirection: 'row' }}>
            <Label style={styles.userInfo}>Rating:</Label>
            <Label style={styles.rating}>{user?.rating}</Label>
          </View>
          <View style={{ marginVertical: 3, flexDirection: 'row' }}>
            <Label style={styles.userInfo}>Coins:</Label>
            <Label style={styles.rating}>{user?.coins}</Label>
          </View>
          <View style={{ marginVertical: 3, flexDirection: 'row' }}>
            <Label style={styles.userInfo}>Games:</Label>
            <Label style={styles.rating}>{user?.gameHistory.length}</Label>
          </View>
        </View>
      </View>
      <Button
        onPress={onLogout}
        color="red"
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          position: 'absolute',
          bottom: 0,
          right: 20,
        }}>
        Logout
      </Button>
    </View>
  );
};

export default ProfileScreen;
