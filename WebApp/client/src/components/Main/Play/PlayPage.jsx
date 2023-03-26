// external
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
// internal
// css
import { PlayPageStyled } from './styles/PlayPage.styled.js';
// components
import Navbar from '../Home/Navbar.jsx';
import RealmSelection from './Setup/Realms/RealmSelection.jsx';
import RoomSelection from './Setup/Rooms/RoomSelection.jsx';
import SectionSelector from './Setup/SectionSelector.jsx';
import GamePage from './Game/GamePage.jsx';
// context
import SocketContext from '../../../contexts/SocketContext.js';

function PlayPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // vars
  const { socket } = useContext(SocketContext);
  const [selectionState, setSelectionState] = useState('realm');

  useEffect(() => {
    if (!socket) return;
    socket.on('game-started', (room_id) => {
      setSelectionState('game');
    });
    socket.on('rejoined-game', (room_id) => {
      setSelectionState('game');
    });

    return () => {
      // have to leave everything here, otherwise the socket events will be subscribed to multiple times
      socket.off('game-started');
    };
  }, [socket]);

  //#region REALM SELECTION
  const [realms, setRealms] = useState([]);
  const [selectedRealmID, setSelectedRealmID] = useState(null);
  useEffect(() => {
    console.log('getting realms...');
    axios
      .get('/realms')
      .then((res) => {
        setRealms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectRealm = (realm_id) => {
    setSelectedRealmID(realm_id);
    axios
      .patch('/realms/selected-realm', { realm_id })
      .then((res) => {
        setSelectedRealmID(realm_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //#endregion

  function Setup() {
    return (
      <div>
        <Navbar />
        {selectionState === 'realm' ? (
          <RealmSelection
            realms={realms}
            selectRealm={selectRealm}
            selectedRealmID={selectedRealmID}
          />
        ) : (
          <SectionSelector
            setSelectionState={() => setSelectionState('realm')}
            title='Choose Realm'
          />
        )}
        {selectionState === 'room' ? (
          <RoomSelection socket={socket} />
        ) : (
          <SectionSelector
            setSelectionState={() => setSelectionState('room')}
            title='Choose Room'
          />
        )}{' '}
      </div>
    );
  }

  return (
    <PlayPageStyled>
      {selectionState === 'game' ? (
        <GamePage socket={socket} setSelectionState={setSelectionState} />
      ) : (
        <Setup />
      )}
    </PlayPageStyled>
  );
}

export default PlayPage;
