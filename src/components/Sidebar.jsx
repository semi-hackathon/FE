import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <SideWrapper>
      <MenuList>
        <StyledLink to="/recommend">추천</StyledLink>
        <StyledLink to="/animation">애니메이션</StyledLink>
        <StyledLink to="/movie">극장판</StyledLink>
        <StyledLink to="/favorites">찜</StyledLink>
      </MenuList>
    </SideWrapper>
  );
};

export default Sidebar;

const SideWrapper = styled.div`
  width: 10%;
  height: 100%;
  background-color: #a78bfa;
  display: flex;
  justify-content: center;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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
