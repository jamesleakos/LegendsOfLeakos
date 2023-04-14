// external
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Classes } from 'legends-of-leakos';
const LibraryRealm = Classes.RealmsAndLand.LibraryRealm;

// internal
// components
import Navbar from '../Home/Navbar.jsx';
import RealmWrapper from './RealmWrapper.jsx';
import RealmList from './RealmList.jsx';
import BiomeList from './BiomeList.jsx';
import CardDisplay from './CardDisplay.jsx';
//css
import { RealmPageStyled } from './styles/RealmPage.styled.js';
// hooks
import useMouseDown from '../../hooks/useMouseDown.js';

function RealmPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //#region REALMS API SEND AND RECEIVE

  const [realms, setRealms] = useState([]);
  const [selectedRealm, setSelectedRealm] = useState(null);
  const [currentRuntimeLandTiles, setCurrentRuntimeLandTiles] = useState([]);

  useEffect(() => {
    console.log('getting realms...');
    axios
      .get('/realms')
      .then((res) => {
        setRealms(createRealmsFromJSON(res.data));
        setSelectedRealm(createRealmFromJSON(res.data[0]));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createRealmFromJSON = (json) => {
    const realm = LibraryRealm.fromJSON(json);
    // adding this for React keys
    realm._id = json._id;
    return realm;
  };

  const createRealmsFromJSON = (json) => {
    const realms = [];
    json.forEach((realm) => {
      realms.push(createRealmFromJSON(realm));
    });
    return realms;
  };

  useEffect(() => {
    console.log('selectedRealm changed: ', selectedRealm);
    if (!selectedRealm) return;
    setCurrentRuntimeLandTiles(selectedRealm.getRuntimeLandTiles());
  }, [selectedRealm]);

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

  // #region OUTLINING BIOMES FUNCTIONS

  const [outlinedTileIndices, setOutlinedTileIndices] = useState([]);
  const mouseOverBiome = (biome) => {
    if (!biome) {
      setOutlinedTileIndices([]);
      return;
    }
    if (displayState === 'select-realm') return;

    const tempIndices = [];
    biome.landTiles.forEach((tile) => {
      tempIndices.push(tile.id);
    });
    // sort tiles by id in ascending order
    tempIndices.sort((a, b) => a.id - b.id);
    setOutlinedTileIndices(tempIndices);
  };

  // #endregion

  // #region LAND TYPE SELECTOR AND TRIGGERING REALM UPDATE

  const [landTypeSelected, setLandTypeSelected] = useState(0);

  const formatImageLink = (link) => {
    return `linear-gradient( rgba(0, 0, 0, .5), rgba(0, 0, 0, .5) ), url('${link}')`;
  };

  const landTileClicked = (tile_index) => {
    if (displayState === 'select-realm') return;
    console.log('landTileClicked', tile_index);
  };

  const isMouseDown = useMouseDown();
  const landTileEntered = (tile_index) => {
    if (displayState === 'select-realm') return;
    if (isMouseDown) {
      console.log('landTileEntered', tile_index);
    }
  };

  const selfSelectorReturn = (tile_index, landType) => {
    console.log('realm page.selfSelectorReturn: ', tile_index, landType);
  };

  //#endregion

  // #region UPDATING REALM

  const changeTileType = (tile_index, landType) => {
    console.log('changeTileType', tile_index, landType);
  };

  // #endregion

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
          setLandTypeSelected={setLandTypeSelected}
          landTypeSelected={landTypeSelected}
          landTileClicked={landTileClicked}
          landTileEntered={landTileEntered}
          landTileLeft={() => {}}
          selfSelectorReturn={selfSelectorReturn}
        />
        {displayState === 'select-realm' && (
          <div className='select-realm-button'>Back</div>
        )}
      </div>
    </RealmPageStyled>
  );
}

export default RealmPage;
