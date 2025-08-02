import React, { useState } from 'react';
import styled from 'styled-components';
import Searchbar from './Searchbar';

const Navbar = () => {
  return (
    <NavWrapper>
      <NavContainer>
        <Logo>Lacheln</Logo>
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
  background-color: #a78bfa;
`;

const NavContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-left: 3rem;
`;

const Logo = styled.strong`
  font-size: 1rem;
  color: violet;
`;
