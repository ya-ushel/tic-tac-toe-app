import React from 'react';
import { View, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

import { Label, Icon } from 'components';
import { socket } from 'utils';
import { Ceil } from '../';
import styles from './styles';

const { width } = Dimensions.get('screen');

const Board = ({
  gameId,
  currentPlayerId,
  boardSize,
  data,
  boardScale = 1,
  players,
  localGame,
}) => {
  const user = useSelector(state => state.user.data);
  const myPlayer = players.find(({ id }) =>
    localGame ? id === currentPlayerId : user.id === id,
  );

  const myPlayerId = myPlayer?.id;

  const renderCeil = (ceil, index) => {
    const makeMove = playerId => {
      socket.emit('player.make-move', {
        id: playerId,
        gameId,
        ceilIndex: ceil.index,
      });
    };
    return (
      <Ceil
        key={ceil.index}
        gameId={gameId}
        myPlayerId={myPlayerId}
        ceil={ceil}
        width={width}
        boardSize={boardSize}
        players={players}
        makeMove={makeMove}
      />
    );
  };

  return (
    <View style={[styles.container, { height: width }]}>
      <View style={[styles.board, { transform: [{ scale: boardScale }] }]}>
        {data.sort((a, b) => a.index - b.index).map((c, i) => renderCeil(c, i))}
      </View>
    </View>
  );
};

export default Board;
