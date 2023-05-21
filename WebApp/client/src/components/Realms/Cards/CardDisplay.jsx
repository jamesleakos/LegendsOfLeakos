// external
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// internal
// components
import Card from './Card.jsx';
//css
import { CardDisplayStyled } from './styles/CardDisplay.styled.js';

function CardDisplay({ biome }) {
  // get card library from server
  const [filterSetting, setFilterSetting] = useState('all'); // ['all', 'landType', 'depth', 'addable']
  const [cardLibrary, setCardLibrary] = useState([]);
  const [filteredCardLibrary, setFilteredCardLibrary] = useState([]);

  useEffect(() => {
    axios
      .get('/cards')
      .then((res) => {
        setCardLibrary(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // filter card library
  useEffect(() => {
    if (!biome) return;

    if (filterSetting === 'all') {
      setFilteredCardLibrary(cardLibrary);
    } else if (filterSetting === 'landType') {
      setFilteredCardLibrary(
        cardLibrary.filter((card) => card.landType === biome.landType)
      );
    } else if (filterSetting === 'depth') {
      setFilteredCardLibrary(
        cardLibrary.filter((card) => card.depth === biome.depth)
      );
    } else if (filterSetting === 'addable') {
      setFilteredCardLibrary(
        cardLibrary.filter((card) => card.addable === true)
      );
    }
  }, [filterSetting, cardLibrary]);

  console.log('cardLibrary', cardLibrary);

  return (
    <CardDisplayStyled>
      <div className='top-bar'>
        <div className='filter-label'>All</div>
        <div className='filter-label'>{biome?.landType}</div>
        <div className='filter-label'>{biome?.depth}</div>
        <div className='filter-label'>Addable</div>
      </div>
      <div className='card-container'>
        {cardLibrary.map((card) => {
          return <Card card={card} key={card.id} />;
        })}
      </div>
    </CardDisplayStyled>
  );
}

export default CardDisplay;
