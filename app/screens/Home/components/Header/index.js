import React from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
// import {
//   withWalletConnect,
//   useWalletConnect,
// } from '@walletconnect/react-native-dapp';

import { UserAvatar, Icon, Label, Button } from 'components';
import { setDoc, signInAnonymously } from 'firebase';
import { loginViaMoralis } from '../../../../actions/user';
import config from 'config';
import store from 'store';
import { login } from 'store/redusers/userSlice';

import styles from './styles';

const Header = () => {
  const user = useSelector(state => state.user.data);
  // const connector = useWalletConnect();

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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: '#ade8f4',
            paddingHorizontal: 12,
            paddingVertical: 5,
            borderRadius: 3,
            // borderWidth: 4,
            // borderColor: '#0077b6',
          }}>
          <Label style={styles.coins}>{user.coins}</Label>
          <Icon name="coins" color="#ffba08" size={18} />
          <Button
            style={{ marginLeft: 15 }}
            onPress={() => loginViaMoralis('connector')}>
            Login
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
