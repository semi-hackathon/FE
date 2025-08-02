import { Outlet } from 'react-router-dom';
import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
const MainLayout = () => {
  const scrollRef = useRef(null);
  return (
    <LayoutWrapper>
      <Navbar />
      <LayoutContainer>
        <Sidebar />
        <OutletWrapper ref={scrollRef}>
          <Outlet context={{ scrollRef }} />
        </OutletWrapper>
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
  width: 100%;
`;
const OutletWrapper = styled.aside`
  flex: 1; // 남는 영역 자동
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden; // 중요!
`;
