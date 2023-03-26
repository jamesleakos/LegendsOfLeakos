import styled from 'styled-components';

export const RealmScrollerStyled = styled.div`
  --post-list-height: 200px;
  --post-list-margin: 20px;

  overflow: hidden;

  .scroll-wrapper {
    height: calc(var(--post-list-height) + 2 * var(--post-list-margin));
    padding: var(--post-list-margin);
    width: 100%;
    overflow-x: scroll;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
  }

  .scroller {
    display: flex;
  }
`;
