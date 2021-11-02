import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Label, Button } from 'components';
import { socket } from 'utils';
import { Header, PlayersList, Board, Info } from './components/';
import { getGame } from 'actions/games';
import styles from './styles';

const GameScreen = ({ gameId, setScreen }) => {
  const user = useSelector(state => state.user.data);
  const [game, setGame] = useState(null);
  const [boardScale, setBoardScale] = useState(1);

  const gameState = game?.state;
  const gameStatus = gameState?.status;
  const currentPlayerId = gameState?.currentPlayerId || null;
  const players = game?.players || [];
  const myPlayer = players.find(({ id }) => id === user.id);

  useEffect(() => {
    fetchGame();
    listenSocketEvents();
  }, []);

  useEffect(() => {
    if (game) {
      joinGame();
    }
  }, [game]);

  const listenSocketEvents = async () => {
    const updateGame = ({ game }) => {
      // console.log('updateGame', game);
      setGame(game);
    };

    socket.on('player.joined', updateGame);
    socket.on('player.leaved', updateGame);
    socket.on('game.started', updateGame);
    socket.on('game.updated', updateGame);
  };

  const onBack = () => {
    socket.emit('player.leave', { id: myPlayer.id, gameId });
    setScreen('home');
  };

  const fetchGame = async () => {
    const game = await getGame(gameId);
    setGame(game);
  };

  const joinGame = async () => {
    if (myPlayer.status !== 'joined') {
      socket.emit('player.join', { id: myPlayer.id, gameId: game.id });
    }
  };

  console.log('currentPlayerId', currentPlayerId);
  return (
    <View style={styles.container}>
      <Header onBack={onBack} />
      <Info
        gameStatus={gameStatus}
        boardScale={boardScale}
        setBoardScale={setBoardScale}
        players={players}
        currentPlayerId={currentPlayerId}
      />
      <Board
        gameId={game?.id}
        boardScale={boardScale}
        currentPlayerId={currentPlayerId}
      />
      <PlayersList
        data={players}
        gameStatus={gameStatus}
        currentPlayerId={currentPlayerId}
      />
    </View>
  );
};

export default GameScreen;
