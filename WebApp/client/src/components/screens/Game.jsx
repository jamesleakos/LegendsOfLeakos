import React, { useEffect, useState, createContext } from 'react';

// css
import './styles/Game.css';

const GamestateContext = React.createContext();
const [gamestate, setGamestate] = useState(null);

const Game = ({ socket, setGameStarted, isMobile, playHover, playClick }) => {
  return (
    <GamestateContext.Provider value={{ name: 'James' }}>
      <div>
        <h1>Game</h1>
        {
          // if the gamestate exists, make a button that increases gameState.counter by 1
          !!gamestate ? (
            <button
              onClick={() =>
                setGamestate({ ...gamestate, counter: gamestate.counter + 1 })
              }
            >
              Increase Counter
            </button>
          ) : null
        }
      </div>
    </GamestateContext.Provider>
  );
};

export default Game;
