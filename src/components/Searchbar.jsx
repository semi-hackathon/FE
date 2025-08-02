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
        placeholder="애니메이션, 영화 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Context의 상태 업데이트
      />
      {/* [제거] 기존의 드롭다운 결과창(ResultsContainer)은 제거합니다.
        메인 컨텐츠 영역이 실시간으로 바뀌므로 더 이상 필요하지 않습니다.
      */}
    </SearchWrapper>
  );
};

export default Searchbar;

// --- Styled Components (일부 수정) ---
const SearchWrapper = styled.div`
  position: relative;
  width: 350px;
`;
const StyledInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:focus {
    background-color: #f0f0f0;
    outline: none;
  }
`;
