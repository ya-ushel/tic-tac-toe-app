import React, { useRef, useState } from 'react';
import { TouchableOpacity, View, Dimensions, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { Button, Label, UserAvatar, TextInput, SvgIcon } from 'components';
import { createRoom } from 'actions/rooms';
import { socket } from 'utils';
import styles from './styles';

const { width, height } = Dimensions.get('screen');
const Board = ({ data }) => {
  const user = useSelector(state => state.user.data);
  console.log(' width, height ', width, height);

  const renderCeil = (ceil, index) => {
    const size = width / 15 - 8;
    return (
      <TouchableOpacity
        key={index}
        style={[styles.ceil, { height: size, width: size }]}>
        {/* <Label>0</Label> */}
      </TouchableOpacity>
    );
  };

  const board = new Array(225).fill(0);
  console.log('board', board);
  return (
    <View style={[styles.container, { height: width }]}>
      <View style={styles.board}>{board.map((c, i) => renderCeil(c, i))}</View>
    </View>
  );
};

export default Board;
