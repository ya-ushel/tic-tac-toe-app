import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Label, Button } from 'components';
import { Header, PlayersList, Board, Info } from './components/';
import { getGame } from 'actions/games';
import styles from './styles';

const GameScreen = ({ gameId, setScreen }) => {
  const user = useSelector(state => state.user.data);
  const [game, setGame] = useState(null);
  const [boardScale, setBoardScale] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchGame();
  }, []);

  const onBack = () => {
    setScreen('home');
  };

  const fetchGame = async () => {
    const game = await getGame(gameId);
    setGame(game);
  };

  console.log('user', user);
  return (
    <View style={styles.container}>
      <Header onBack={onBack} />
      <Info
        boardScale={boardScale}
        setBoardScale={setBoardScale}
        players={game?.players}
      />
      <Board
        boardScale={boardScale}
        currentPlayerId={game?.state.currentPlayerId}
      />
      <PlayersList
        data={game?.players}
        currentPlayerId={game?.state.currentPlayerId}
      />
    </View>
  );
};

export default GameScreen;
