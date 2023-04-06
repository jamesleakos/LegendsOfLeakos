// external
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// internal
// components
import Navbar from '../Home/Navbar.jsx';
import RealmMap from '../Tiles/RealmMap.jsx';
//css
import { RealmPageStyled } from './styles/RealmPage.styled.js';

function RealmPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [realms, setRealms] = useState([]);
  const [tiles, setTiles] = useState([]);
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
  useEffect(() => {
    if (realms.length === 0) return;
    // TODO: this should be replaced by a Realm class function
    const tempTiles = [];
    realms[0].biomes.forEach((biome) => {
      biome.terrain.landTiles.forEach((tile) => {
        tempTiles.push(tile);
      });
    });
    // sort tiles by id in ascending order
    tempTiles.sort((a, b) => a.id - b.id);
    setTiles(tempTiles);
  }, [realms]);

  return (
    <RealmPageStyled>
      <Navbar />
      <RealmMap
        tiles={tiles}
        onClick={(id) => {
          console.log(`tile with id ${id} clicked`);
        }}
      />
    </RealmPageStyled>
  );
}

export default RealmPage;