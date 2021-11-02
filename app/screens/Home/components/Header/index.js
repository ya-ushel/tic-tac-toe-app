import React from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { UserAvatar, SvgIcon, Label } from '../../../../components';

import styles from './styles';

const Header = () => {
  const user = useSelector(state => state.user.data);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <UserAvatar
            backgroundColor={user.avatarColor}
            label={user.nickname}
          />
          <Label style={styles.nickname}>{user.nickname}</Label>
        </View>
        <TouchableOpacity>
          {/* <SvgIcon.Logout width={25} height={25} /> */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;
