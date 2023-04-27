// external
import React, { useEffect, useState } from 'react';

// internal
// components
//css
import { CardStyled } from './styles/Card.styled.js';

function Card({ card }) {
  return (
    <CardStyled>
      <div className='card-name'>{card.name}</div>
      <div className='card-image'>
        <img src={card.image} alt={card.name} />
      </div>
      <div className='card-description'>{card.description}</div>
    </CardStyled>
  );
}

export default Card;
