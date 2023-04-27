import styled from 'styled-components';
import '../../../../styles/constants.css';

export const CardDisplayStyled = styled.div`
    grid-column: 2 / -1;
    grid-row: 1 / 100;
    height: calc(100vh - var(--title-bar-height) - var(--navbar-height) - 2*var(--margin-outside-main));
    background-color: red;
    border: 1px solid var(--border-color-dim);
    border-radius: 5px;
    margin: 0 var(--margin-inside-main);
`;