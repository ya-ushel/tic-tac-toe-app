import React from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { UserAvatar, SvgIcon, Label } from 'components';
import fonts from 'global/fonts';

import styles from './styles';

const Header = ({ onBack, score }) => {
  const user = useSelector(state => state.user.data);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            marginLeft: -10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={onBack}>
          <SvgIcon.ArrowLeft width={25} height={35} />
          <Label
            style={{
              marginLeft: 3,
              color: 'white',
              fontFamily: fonts.semiBold,
            }}>
            Back
          </Label>
        </TouchableOpacity>
        <View style={styles.userContainer}>
          <Label style={styles.nickname}>
            Score:{' '}
            <Label
              style={{
                fontSize: 17,
                fontFamily: fonts.semiBold,
                color: '#ffba08',
              }}>
              {score}
            </Label>
          </Label>
          <UserAvatar
            label={user.nickname}
            backgroundColor={user.avatarColor}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
