// external
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Classes, Enums } from 'legends-of-leakos';
const LibraryRealm = Classes.RealmsAndLand.LibraryRealm;
const LandType = Enums.LandType;

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
  // const [currentRuntimeLandTiles, setCurrentRuntimeLandTiles] = useState([]);

  useEffect(() => {
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

  const createNewRealm = () => {
    axios
      .post('/realms')
      .then((res) => {
        _addRealmAndRefresh(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveRealm = () => {
    if (!selectedRealm) return;
    const json = selectedRealm.toJSON();
    if (selectedRealm._id) {
      axios
        .put(`/realms/${selectedRealm._id}`, json)
        .then((res) => {
          _addRealmAndRefresh(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post('/realms', json)
        .then((res) => {
          _addRealmAndRefresh(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const _addRealmAndRefresh = (data) => {
    const newRealm = createRealmFromJSON(data);
    // add to realms if ._id is not already there
    if (!realms.find((realm) => realm._id === newRealm._id)) {
      setRealms([...realms, newRealm]);
    } else {
      const tempRealms = realms.map((realm) => {
        if (realm._id === newRealm._id) {
          return newRealm;
        }
        return realm;
      });
      setRealms(tempRealms);
    }
    setSelectedRealm(newRealm);
  };

  const deleteRealm = (realm_id) => {
    if (!realm_id) {
      console.log('Delete Realm - No realm id');
      return;
    }

    // take out of realms
    const tempRealms = realms.filter((realm) => realm._id !== realm_id);
    setRealms(tempRealms);

    // remove from server
    axios
      .delete(`/realms/${realm_id}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const createRealmFromJSON = (json) => {
    const realm = LibraryRealm.fromJSON(json);
    // adding this for React keys
    realm._id = json._id || null;
    if (!realm._id) {
      console.log('create realm from json - no realm id');
    }
    return realm;
  };

  const createRealmsFromJSON = (json) => {
    const realms = [];
    json.forEach((realm) => {
      realms.push(createRealmFromJSON(realm));
    });
    return realms;
  };

  // useEffect(() => {
  //   console.log('selectedRealm changed: ', selectedRealm);
  //   if (!selectedRealm) return;
  //   setCurrentRuntimeLandTiles(selectedRealm.getRuntimeLandTiles());
  // }, [selectedRealm]);

  //#endregion

  //#region DISPLAY STATE

  const [displayState, setDisplayState] = useState('select-realm');
  const handleBack = () => {
    // save the realm
    saveRealm();

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
    changeTileType(tile_index, landTypeSelected);
  };

  const isMouseDown = useMouseDown();
  const landTileEntered = (tile_index) => {
    if (displayState === 'select-realm') return;
    if (isMouseDown) {
      changeTileType(tile_index, landTypeSelected);
    }
  };

  const selfSelectorReturn = (tile_index, landType) => {
    changeTileType(tile_index, landType);
  };

  const changeTileType = (tile_index, landType) => {
    const copy = LibraryRealm.copyRealm(selectedRealm);
    // so we can save it with the server
    copy._id = selectedRealm._id;
    // if we're making a new city, we need to remove any old ones
    if (landType === LandType.city) {
      const tile = copy
        .getLandTiles()
        .find((tile) => tile.landType === landType);
      if (tile) copy.changeLandTileType(tile.id, tile.mostCommonNeighborType());
    } else {
      // if we're not making a new city, we can't overwrite an existing one
      const tile = copy.getLandTiles().find((tile) => tile.id === tile_index);
      if (tile.landType === LandType.city) return;
    }
    // change the tile type
    copy.changeLandTileType(tile_index, landType);
    setSelectedRealm(copy);
  };

  //#endregion

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
        <div
          className='realm-title'
          onDoubleClick={() => {
            console.log('doubleclick');
          }}
        >
          {selectedRealm?.name}
        </div>
      </div>
      <div className='main-content'>
        {displayState === 'select-realm' && (
          <RealmList
            realms={realms}
            selectedRealm={selectedRealm}
            setSelectedRealm={setSelectedRealm}
            deleteRealm={deleteRealm}
            createNewRealm={createNewRealm}
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
      </div>
    </RealmPageStyled>
  );
}

export default RealmPage;
