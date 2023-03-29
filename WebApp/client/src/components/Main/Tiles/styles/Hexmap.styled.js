import styled from 'styled-components';

export const HexmapStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 10px;

  .hex-area {
    display: flex;
    position: relative;
    width: 100%;
    height: 90%;
  }

  .hexagon-svg {
    stroke: #000;
    stroke-width: 1;
  }

  .hexagon-svg:hover {
    fill: rgba(255, 255, 255, 1);
  }
`;
