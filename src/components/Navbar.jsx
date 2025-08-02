import React, { useState } from 'react';
import styled from 'styled-components';
import Searchbar from './Searchbar';

const Navbar = () => {
  return (
    <NavWrapper>
      <NavContainer>
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
  background-color: #0f0f0f;
  justify-content: center;
`;

const NavContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
`;
