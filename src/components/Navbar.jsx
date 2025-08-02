import React, { useState } from 'react';
import styled from 'styled-components';
import Searchbar from './Searchbar';

const Navbar = () => {
  return (
    <NavWrapper>
      <NavContainer>
        <HomeButton>홈</HomeButton>
        <Searchbar />
      </NavContainer>
    </NavWrapper>
  );
};

export default Navbar;

const NavWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 10vh;
  background-color: blue;
`;

const NavContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-left: 3rem;
`

const HomeButton = styled.button`
  all: unset;
  font-size: 1rem;
`