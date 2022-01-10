import React, { createRef, useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import { Label, Icon } from 'components';
import { wait, socket } from 'utils';

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
  onBoardRef = () => null,
}) => {
  const user = useSelector(state => state.user.data);
  const zoomableViewRef = createRef();
  const [loading, setLoading] = useState(false);

  const myPlayer = players.find(({ id }) =>
    localGame ? id === currentPlayerId : user.id === id,
  );

  const myPlayerId = myPlayer?.id;

  useEffect(() => {
    if (zoomableViewRef) {
      onBoardRef(zoomableViewRef.current);
    }
  }, [zoomableViewRef]);

  const renderCeil = (ceil, index) => {
    const makeMove = async playerId => {
      setLoading(true);

      socket.emit('player.make-move', {
        id: playerId,
        gameId,
        ceilIndex: ceil.index,
      });

      // await wait(500);
      setLoading(false);
    };
    return (
      <Ceil
        loading={loading}
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
      <ReactNativeZoomableView
        maxZoom={1.5}
        minZoom={1}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}
        ref={zoomableViewRef}
        onZoomAfter={() => console.log('')}>
        <View style={[styles.board]}>
          {data
            .sort((a, b) => a.index - b.index)
            .map((c, i) => renderCeil(c, i))}
        </View>
      </ReactNativeZoomableView>
    </View>
  );
};

export default Board;
