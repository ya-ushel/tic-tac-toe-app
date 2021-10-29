import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { UserAvatar, SvgIcon } from '../../../../components';

import styles from './styles';

const Header = () => {
  const user = useSelector(state => state.user.data);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <UserAvatar label={user.nickname} />
          <Text style={styles.nickname}>{user.nickname}</Text>
        </View>
        <TouchableOpacity>
          <SvgIcon.Logout width={25} height={25} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;
