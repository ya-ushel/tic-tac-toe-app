import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Label, Button } from 'components';
import { Header, PlayersList, Board } from './components/';
import { getGame } from 'actions/games';
import styles from './styles';

const GameScreen = ({ gameId, setScreen }) => {
  const user = useSelector(state => state.user.data);
  const [game, setGame] = useState(null);
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
      <PlayersList data={game?.players} />
      <Board />
    </View>
  );
};

export default GameScreen;
