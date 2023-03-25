import styled from 'styled-components';

export const RoomTileStyled = styled.div`
  display: inline-block;
  height: 200px;
  width: 150px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  transition: 0.5s;

  :hover {
    transform: scale(1.02);
    -webkit-transform: scale(1.02);
  }
`;
