// external
import React, { useEffect } from 'react';
// internal
// css
import { GamePageStyled } from './styles/GamePage.styled.js';
// components

function GamePage({ socket, setSelectionState }) {
  useEffect(() => {
    if (!socket) return;

    socket.on('server-message', onServerMessage);
    socket.on('game-ended', onGameEnded);

    return () => {
      // have to leave everything here, otherwise the socket events will be subscribed to multiple times
      socket.removeAllListeners('server-message');
      socket.removeAllListeners('game-ended');

      console.log('game page return');
    };
  }, [socket]);

  const onServerMessage = (data) => {
    console.log('server message', data);
  };

  const onGameEnded = (data) => {
    console.log('game ended');
    setSelectionState('room');
  };

  const test = () => {
    socket.emit('client-message');
  };
  const endGame = () => {
    socket.emit('end-game');
    socket.emit('request-rooms');
  };
  //#endregion

  return (
    <GamePageStyled>
      <button onClick={test}>test</button>
      <button onClick={endGame}>endGame</button>
    </GamePageStyled>
  );
}

export default GamePage;
