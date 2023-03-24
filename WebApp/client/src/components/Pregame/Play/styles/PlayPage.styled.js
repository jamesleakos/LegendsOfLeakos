import styled from 'styled-components';

export const PlayPageStyled = styled.div`
  --section-selector-height: 100px;

  .section-selector {
    height: var(--section-selector-height);
    width: 100%;
    border: 1px solid black;
    text-align: center;
    line-height: var(--section-selector-height);
  }
`;
