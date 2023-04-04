import React from 'react';

// components
import TileScroller from '../../../UtilityComponents/TileScroller.jsx';
import RealmTile from './RealmTile.jsx';

// css
import { RealmSelectionStyled } from './styles/RealmSelection.styled.js';

function RealmSelection({ realms, selectRealm, selectedRealmID }) {
  const RealmMapper = () => {
    // make a copy of realms
    const mapRealms = realms.slice();
    const selectedRealm = realms.find((realm) => {
      return realm._id === selectedRealmID;
    });
    if (selectedRealm) {
      // move the selected realm to the front of the array
      mapRealms.splice(mapRealms.indexOf(selectedRealm), 1);
      mapRealms.unshift(selectedRealm);
    }

    return mapRealms.map((realm, index) => {
      return (
        <RealmTile
          key={realm.name + index + ''}
          realm={realm}
          selectRealm={selectRealm}
          selected={realm._id === selectedRealmID}
        />
      );
    });
  };

  const formatImageLink = (link) => {
    return `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) ), url('${link}')`;
  };

  return (
    <RealmSelectionStyled
      style={{
        backgroundImage: formatImageLink(
          'https://ik.imagekit.io/hfywj4j0a/LoL/canyon_city_bw_JRDQjbAg0.jpg'
        ),
      }}
    >
      <div className='fader'></div>
      <h3>Choose your Realm</h3>
      <TileScroller Mapper={RealmMapper} />
    </RealmSelectionStyled>
  );
}

export default RealmSelection;
