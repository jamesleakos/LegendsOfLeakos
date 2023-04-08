import styled from 'styled-components';
import '../../../styles/constants.css';

export const RealmPageStyled = styled.div`
  --back-button-height: 30px;

  height: 100vh;
  overflow: hidden;

  .main-content {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
  }

  .title-bar {
    width: 100vw;
    height: var(--title-bar-height);
    background-color: var(--color-background-primary);
    text-align: center;
    line-height: var(--title-bar-height);
  }

  .realm-title {
    font-size: 1.5rem;
    font-family: var(--bold-medieval-font);
    font-weight: 900;
  }

  .back-button {
    display: inline-block;
    float: left;
    height: var(--back-button-height);
    font-size: 0.8rem;
    padding: 5px;
    color: var(--text-color-secondary);
    border: 1px solid var(--border-color-dim);
    // border-radius: 5px;
    background-color: var(--color-background-navbar);
    text-align: center;
    line-height: var(--back-button-height);
    font-family: var(--logo-font);
    // animation
    font-size: 1rem;
    transition: 0.5s ease;
  }
  .back-button:hover {
    border: 1px solid var(--border-color-bright);
    color: var(--text-color-accent);
  }

  .select-realm-button {
    display: inline-block;
    float: left;
    height: var(--back-button-height);
    font-size: 0.8rem;
    padding: 5px;
    color: var(--text-color-secondary);
    border: 1px solid var(--border-color-dim);
    // border-radius: 5px;
    background-color: var(--color-background-navbar);
    text-align: center;
    line-height: var(--back-button-height);
    font-family: var(--logo-font);
    // animation
    font-size: 1rem;
    transition: 0.5s ease;
    grid-column: 2;
  }
  .select-realm-button:hover {
    border: 1px solid var(--border-color-bright);
    color: var(--text-color-accent);
  }

`;
