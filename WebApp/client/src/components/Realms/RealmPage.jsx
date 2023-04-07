// external
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// internal
// components
import Navbar from '../Home/Navbar.jsx';
import RealmWrapper from './RealmWrapper.jsx';
import RealmList from './RealmList.jsx';
import BiomeList from './BiomeList.jsx';
import LandTypeSelectorBar from './LandTypeSelectorBar.jsx';
import CardDisplay from './CardDisplay.jsx';
//css
import { RealmPageStyled } from './styles/RealmPage.styled.js';

function RealmPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //#region REALMS API SEND AND RECEIVE

  const [realms, setRealms] = useState([]);
  const [selectedRealm, setSelectedRealm] = useState(null);
  useEffect(() => {
    console.log('getting realms...');
    axios
      .get('/realms')
      .then((res) => {
        setRealms(res.data);
        setSelectedRealm(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //#endregion

  //#region DISPLAY STATE

  const [displayState, setDisplayState] = useState('select-realm');

  //#endregion

  return (
    <RealmPageStyled>
      <Navbar />
      <RealmWrapper realm={selectedRealm} />
      {displayState === 'select-realm' && <RealmList />}
      {displayState === 'edit-realm' && <BiomeList />}
      {displayState === 'edit-realm' && <LandTypeSelectorBar />}
    </RealmPageStyled>
  );
}

export default RealmPage;
