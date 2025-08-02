import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext"; // [변경] Context 훅 사용

const Searchbar = () => {
  // [변경] 로컬 상태 대신 Context의 상태와 세터를 가져옴
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // 컴포넌트가 언마운트되거나 검색어가 바뀔 때, 검색어를 초기화 할 수 있습니다. (선택사항)
  useEffect(() => {
    return () => {
      // setSearchTerm(''); // 페이지 이동 시 검색어 초기화가 필요하면 활성화
    };
  }, [navigate]);

  return (
    <SearchWrapper>
      <StyledInput
        ref={inputRef}
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Context의 상태 업데이트
      />
    </SearchWrapper>
  );
};

export default Searchbar;

// --- Styled Components (일부 수정) ---
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  width: 40rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  border: none;
  border-bottom: 0.125rem solid white;
  font-size: 1.3rem;
  font-weight: bold;
  color: lightgray;
  background-color: #0f0f0f;

  &:focus {
    outline: 0.5px soild gray;
    outline-offset: 0.25rem;
  }
`;
