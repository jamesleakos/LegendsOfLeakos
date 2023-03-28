import styled from 'styled-components';
import '../../../../../styles/constants.css';

export const SectionSelectorStyled = styled.div`
  --section-selector-height: 100px;
  --border-color: var(--color-background-secondary);

  height: var(--section-selector-height);
  width: 100%;
  border: 1px solid var(--border-color);
  text-align: center;
  line-height: var(--section-selector-height);

  position: absolute;
  bottom: 0;
`;
