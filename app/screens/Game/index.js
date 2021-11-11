import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Label, Button } from 'components';
import { socket } from 'utils';
import {
  Header,
  GameDetails,
  PlayersScores,
  PlayersList,
  Board,
  Info,
} from './components/';
import { getGame } from 'actions/games';
import styles from './styles';

const GameScreen = ({ gameId, setScreen }) => {
  const user = useSelector(state => state.user.data);
  const [game, setGame] = useState(null);
  const [joined, setJoined] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [boardScale, setBoardScale] = useState(1);
  const [boardRef, setBoardRef] = useState(null);

  const gameState = game?.state;
  const gameStatus = gameState?.status;
  const gameBoard = gameState?.board || { data: [] };
  const gameSettings = game?.settings || {};
  const currentPlayerId = gameState?.currentPlayerId || null;
  const players = game?.players || [];
  const myPlayer = players.find(({ id }) => id === user.id);
  const localGame = gameSettings.localGame;
  // const localPlayers = gameSettings.localPlayers;
  useEffect(() => {
    fetchGame();
    listenSocketEvents();

    return () => {
      unsubscribeSocketEvents();
    };
  }, []);
  console.log(gameStatus, 'gameStatus');
  useEffect(() => {
    if (game && myPlayer) {
      joinGame();
      listenSocketEvents();
    }
  }, [game]);

  const listenSocketEvents = async () => {
    unsubscribeSocketEvents();

    if (!game) {
      return;
    }

    const updateGame = ({ game }) => {
      console.log('updateGame');
      setGame(game);
    };

    socket.on('player.joined', updateGame);
    socket.on('player.leaved', updateGame);
    socket.on('game.started', updateGame);
    socket.on('game.updated', updateGame);
  };

  const unsubscribeSocketEvents = async () => {
    socket.off('player.joined');
    socket.off('player.leaved');
    socket.off('game.started');
    socket.off('game.updated');
  };

  const onBack = () => {
    socket.emit('player.leave', { id: myPlayer?.id, gameId });
    setScreen('home');
  };

  const fetchGame = async () => {
    const game = await getGame(gameId);
    setGame(game);
  };

  const joinGame = async () => {
    if (myPlayer?.status !== 'joined' || !joined) {
      await socket.emit('player.join', { id: myPlayer?.id, gameId: game.id });
      setJoined(true);
    }
  };

  const changeBoardScale = scale => {
    if (scale >= 1 && scale <= 1.5) {
      const fixed = parseFloat(scale.toFixed(2));
      console.log('scale,', fixed);

      boardRef.zoomTo(fixed);
      setBoardScale(fixed);
    }
  };

  const onBoardRef = boardRef => {
    setBoardRef(boardRef);
  };

  return (
    <View style={styles.container}>
      <Header onBack={onBack} score={myPlayer?.score || 0} />
      <Info
        gameId={gameId}
        localGame={localGame}
        gameStatus={gameStatus}
        boardScale={boardScale}
        setBoardScale={changeBoardScale}
        players={players}
        currentPlayerId={currentPlayerId}
        resultsVisible={resultsVisible}
      />
      {resultsVisible ? (
        <PlayersScores players={players} />
      ) : (
        <Board
          onBoardRef={onBoardRef}
          localGame={localGame}
          players={players}
          data={gameBoard.data}
          boardSize={gameBoard.size}
          gameId={game?.id}
          boardScale={boardScale}
          currentPlayerId={currentPlayerId}
        />
      )}

      {gameStatus !== 'finished' ? (
        <PlayersList
          gameId={gameId}
          data={players}
          gameStatus={gameStatus}
          currentPlayerId={currentPlayerId}
        />
      ) : (
        <GameDetails
          resultsVisible={resultsVisible}
          setResultsVisible={setResultsVisible}
        />
      )}
    </View>
  );
};

export default GameScreen;
