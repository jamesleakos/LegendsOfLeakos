import styled from 'styled-components';
import '../../../styles/constants.css';

export const RealmWrapperStyled = styled.div`
  grid-column: 2;
  height: calc(100vh - var(--navbar-height) - var(--title-bar-height));
  width: 100%;
  transition: 0.5s ease;

  .realm-map-wrapper {
    border: 1px solid var(--border-color-dim);
    padding: 40px;
  }
  .realm-map-wrapper:hover {
    border: 1px solid var(--border-color-bright);
  }

  .realm-map {
    height: 100%;
    transition: 0.5s ease;
  }
  .realm-map:hover {
    transform: scale(1.01);
    -webkit-transform: scale(1.01);
  }
`;