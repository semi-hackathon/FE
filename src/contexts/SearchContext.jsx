import React, { createContext, useState, useContext } from "react";
import DebouncedSearch from "../hooks/DebouncedSearch"; // 제공해주신 디바운스 훅

// 1. Context 생성
const SearchContext = createContext();

// 2. Context를 사용하기 위한 커스텀 훅
export const useSearch = () => useContext(SearchContext);

// 3. 상태와 함수를 포함하는 Provider 컴포넌트
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = DebouncedSearch(searchTerm, 500); // 500ms 디바운스

  const value = {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
