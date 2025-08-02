import React, { useRef, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useSearch } from '../contexts/SearchContext'; // [추가]
import SearchResults from '../pages/SearchResults'; // [추가] SearchResults 컴포넌트

const MainLayout = () => {
  const scrollRef = useRef(null);
  const { debouncedSearchTerm, setSearchTerm } = useSearch(); // [추가] Context에서 디바운스된 검색어 가져오기
  const location = useLocation();

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchTerm('');
    }
  }, [location.pathname]);

  return (
    <LayoutWrapper>
      <Sidebar />
      <LayoutContainer>
        <Navbar />
        <OutletWrapper ref={scrollRef}>
          {/* [변경] 검색어가 있으면 SearchResults를, 없으면 기존 Outlet을 렌더링 */}
          {debouncedSearchTerm ? (
            <SearchResults searchTerm={debouncedSearchTerm} />
          ) : (
            <Outlet context={{ scrollRef }} />
          )}
        </OutletWrapper>
      </LayoutContainer>
    </LayoutWrapper>
  );
};

export default MainLayout;

// --- Styled Components (변경 없음) ---
const LayoutWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 90%;
`;
const OutletWrapper = styled.aside`
  background-color: #0f0f0f;
  flex: 1;
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
`;
