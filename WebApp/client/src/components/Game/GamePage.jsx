// external
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// internal
// css
import { GamePageStyled } from './styles/GamePage.styled.js';
// components
// context
import SocketContext from '../../contexts/SocketContext.js';

function PlayPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // navigate
  const navigate = useNavigate();

  // socket
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;
    socket.on('server-message', (data) => {
      console.log('server message', data);
    });

    socket.on('game-ended', (data) => {
      console.log('game ended');
      navigate('/play');
    });

    return () => {
      // have to leave everything here, otherwise the socket events will be subscribed to multiple times
      socket.off('server-message');
      socket.off('game-ended');
    };
  }, [socket]);

  const test = () => {
    socket.emit('client-message');
  };
  const endGame = () => {
    socket.emit('end-game');
  };
  //#endregion

  return (
    <GamePageStyled>
      {/* test button */}
      <button onClick={test}>test</button>
      <button onClick={endGame}>endGame</button>
    </GamePageStyled>
  );
}

export default PlayPage;
