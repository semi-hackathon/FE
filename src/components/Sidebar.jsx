import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <SideWrapper>
      <MenuList>
        <Logo>Lacheln</Logo>
        <StyledLink to="/recommend">추천</StyledLink>
        <StyledLink to="/animation">애니</StyledLink>
        <StyledLink to="/movie">극장판</StyledLink>
        <StyledLink to="/favorites">찜</StyledLink>
      </MenuList>
    </SideWrapper>
  );
};

export default Sidebar;

const SideWrapper = styled.div`
  width: 5%;
  height: 100%;
  background-color: #a78bfa;
  display: flex;
  justify-content: center;
`;

const MenuList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Logo = styled.div`
  font-size: 1rem;
  margin: 20px 0px 20px 0px;
  display:flex;
  align-items:center;
`;

const StyledLink = styled(NavLink)`
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  padding: 10px;
  border-radius: 6px;

  &.active {
    background-color: rgba(255, 255, 255, 0.3);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
