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
  const handleBack = () => {
    if (displayState === 'edit-realm') {
      setDisplayState('select-realm');
    } else if (displayState === 'edit-biome') {
      setDisplayState('edit-realm');
    }
  };

  //#endregion

  // #region BIOME FUNCTIONS

  const [outlinedTileIndices, setOutlinedTileIndices] = useState([]);
  const mouseOverBiome = (biome) => {
    if (!biome) {
      setOutlinedTileIndices([]);
      return;
    }
    if (displayState === 'select-realm') return;

    const tempIndices = [];
    biome.terrain.landTiles.forEach((tile) => {
      tempIndices.push(tile.id);
    });
    // sort tiles by id in ascending order
    tempIndices.sort((a, b) => a.id - b.id);
    setOutlinedTileIndices(tempIndices);
  };

  // #endregion

  const formatImageLink = (link) => {
    return `linear-gradient( rgba(0, 0, 0, .5), rgba(0, 0, 0, .5) ), url('${link}')`;
  };

  return (
    <RealmPageStyled
      style={{
        backgroundImage: formatImageLink(
          'https://ik.imagekit.io/hfywj4j0a/LoL/canyon_city_N6bb4PTK3.png'
        ),
      }}
    >
      <Navbar />
      <div className='title-bar'>
        {displayState !== 'select-realm' && (
          <div className='back-button' onClick={handleBack}>
            Back
          </div>
        )}
        <div className='realm-title'>{selectedRealm?.name}</div>
      </div>
      <div className='main-content'>
        {displayState === 'select-realm' && (
          <RealmList
            realms={realms}
            selectedRealm={selectedRealm}
            setSelectedRealm={setSelectedRealm}
          />
        )}
        {displayState === 'edit-realm' && (
          <BiomeList
            biomes={selectedRealm?.biomes}
            mouseOverBiome={mouseOverBiome}
          />
        )}
        <RealmWrapper
          realm={selectedRealm}
          displayState={displayState}
          setDisplayState={setDisplayState}
          outlinedTileIndices={outlinedTileIndices}
        />
        {displayState === 'select-realm' && (
          <div className='select-realm-button'>Back</div>
        )}
        {displayState === 'edit-realm' && <LandTypeSelectorBar />}
      </div>
    </RealmPageStyled>
  );
}

export default RealmPage;
