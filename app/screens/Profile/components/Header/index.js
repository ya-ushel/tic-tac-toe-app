import React from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { UserAvatar, SvgIcon, Label } from 'components';
import { setDoc, signInAnonymously } from 'firebase';
import config from 'config';
import store from 'store';
import { login } from 'store/redusers/userSlice';

import styles from './styles';

const Header = () => {
  const user = useSelector(state => state.user.data);

  const onLogout = async () => {
    const { user: newUser } = await signInAnonymously();

    const getRandom = (min, max) =>
      Math.floor(Math.random() * (min - max + 1) + max);

    const userDocument = {
      id: newUser.uid,
      createdAt: Date.now(),
      avatarColor:
        config.avatarColors[getRandom(0, config.avatarColors.length)],
      nickname: 'Player' + getRandom(1000, 9999),
    };

    await setDoc('users', userDocument.id, userDocument);
    store.dispatch(login(userDocument));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <UserAvatar
            backgroundColor={user?.avatarColor}
            label={user?.nickname}
          />
          <Label style={styles.nickname}>{user?.nickname}</Label>
        </View>
        <TouchableOpacity onPress={onLogout}>
          <SvgIcon.Logout width={25} height={25} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;
