import styled from 'styled-components';

export const NavbarStyled = styled.div`
  // define some constants
  --navbar-height: 80px;

  height: var(--navbar-height);
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  border-bottom: 1px solid gray;
  position: sticky;
  top: 0;
  background-color: white;

  .navbar-item {
    display: inline-block;
    width: 100px;
    text-align: center;
    line-height: var(--navbar-height);
  }

  .left {
    border-right: 1px solid gray;
  }

  .right {
    float: right;
    border-left: 1px solid gray;
  }
`;
