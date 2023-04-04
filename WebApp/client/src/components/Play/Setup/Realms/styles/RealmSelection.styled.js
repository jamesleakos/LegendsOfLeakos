import styled from 'styled-components';
import '../../../../../styles/constants.css';

export const RealmSelectionStyled = styled.div`
  padding: var(--margin-outside-main);
  position: relative;

  // background image
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  z-index: 1;

  * {
    z-index: 3;
  }

  h3 {
    position: relative;
    display: block;
    border-bottom: 1px solid var(--text-color-accent);
    font-family: var(--logo-font);
    color: var(--text-color-accent);
    z-index: 3;
    // margin-bottom: var(--margin-inside-main);
  }

  .fader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-background-light);
    opacity: 0.1;
    z-index: 2;
  }
`;
