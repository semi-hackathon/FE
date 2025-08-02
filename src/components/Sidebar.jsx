import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <SideWrapper>
      <MenuList>
        <Logo>Lacheln</Logo>
        <StyledLink to="/recommend">추천 애니메이션</StyledLink>
        <StyledLink to="/animation">TV 애니메이션</StyledLink>
        <StyledLink to="/movie">영화 애니메이션</StyledLink>
        <StyledLink to="/favorites">찜 목록</StyledLink>
      </MenuList>
    </SideWrapper>
  );
};

export default Sidebar;

const SideWrapper = styled.div`
  width: 10%;
  height: 100%;
  background-color: #0f0f0f;
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
  font-size: 1.8rem;
  margin-top: 12px;
  margin-bottom: 28px;
  display:flex;
  align-items:center;
  justify-content: center;
  color: white;
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
