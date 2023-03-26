import styled from 'styled-components';

export const RealmTileStyled = styled.div`
  --post-list-height: 200px;

  display: inline-block;
  width: 150px;
  height: var(--post-list-height);
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
  transition: 0.5s;

  :hover {
    transform: scale(1.02);
    -webkit-transform: scale(1.02);
  }
`;