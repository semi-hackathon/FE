import { Outlet } from 'react-router-dom';
import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';

const MainLayout = () => {
  return (
    <LayoutWrapper>
      <Navbar />
      <LayoutContainer>
        <Sidebar />
        <Outlet />
      </LayoutContainer>
    </LayoutWrapper>
  );
};

export default MainLayout;

const LayoutWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 90%;
`;
