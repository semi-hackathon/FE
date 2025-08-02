import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSearch } from "../contexts/SearchContext"; // [추가]
import SearchResults from "../pages/SearchResults"; // [추가] SearchResults 컴포넌트

const MainLayout = () => {
  const scrollRef = useRef(null);
  const { debouncedSearchTerm } = useSearch(); // [추가] Context에서 디바운스된 검색어 가져오기

  return (
    <LayoutWrapper>
      {/* Navbar는 이제 Context를 통해 Searchbar와 통신합니다. */}
      <Navbar />
      <LayoutContainer>
        <Sidebar />
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
`;
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 90%;
  width: 100%;
`;
const OutletWrapper = styled.aside`
  flex: 1;
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
`;
