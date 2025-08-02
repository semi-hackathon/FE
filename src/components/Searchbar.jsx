import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DebouncedSearch from "../hooks/DebouncedSearch";

// --- API 설정 및 함수 ---
const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
    accept: "application/json",
  },
});

// [MODIFIED] 1. 가장 인기 있는 'TV 및 영화 애니메이션' 5개를 가져오는 함수
const fetchTopAnimations = async () => {
  // Promise.all을 사용해 TV와 영화 애니메이션 정보를 동시에 요청
  const [tvResponse, movieResponse] = await Promise.all([
    // 인기 TV 애니메이션 요청
    apiClient.get("/discover/tv", {
      params: {
        language: "ko-KR",
        with_genres: 16, // 애니메이션 장르 ID
        sort_by: "popularity.desc",
      },
    }),
    // 인기 영화 애니메이션 요청
    apiClient.get("/discover/movie", {
      params: {
        language: "ko-KR",
        with_genres: 16, // 애니메이션 장르 ID
        sort_by: "popularity.desc",
      },
    }),
  ]);

  // 각 결과에 media_type을 명시적으로 추가
  const tvResults = tvResponse.data.results.map((item) => ({
    ...item,
    media_type: "tv",
  }));
  const movieResults = movieResponse.data.results.map((item) => ({
    ...item,
    media_type: "movie",
  }));

  // 두 배열을 합친 후, 인기도(popularity) 기준으로 내림차순 정렬
  const combinedResults = [...tvResults, ...movieResults].sort(
    (a, b) => b.popularity - a.popularity
  );

  // 정렬된 결과에서 상위 5개만 반환
  return combinedResults.slice(0, 5);
};

// 검색어로 TV, 영화를 검색하는 함수
const searchByQuery = async (query) => {
  const { data } = await apiClient.get("/search/multi", {
    params: {
      query,
      language: "ko-KR",
      include_adult: true,
    },
  });
  return data.results.filter(
    (item) =>
      (item.media_type === "tv" || item.media_type === "movie") &&
      item.poster_path
  );
};

// --- 컴포넌트 ---
const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchTerm = DebouncedSearch(searchTerm, 500);
  const navigate = useNavigate();
  const searchWrapperRef = useRef(null);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (debouncedSearchTerm) {
          const searchResults = await searchByQuery(debouncedSearchTerm);
          setResults(searchResults);
        } else {
          const topAnimes = await fetchTopAnimations();
          setResults(topAnimes);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearchTerm, isFocused]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (item) => {
    if (!item.media_type) return;

    const path = `/${item.media_type}/${item.id}`;
    navigate(path);
    setIsFocused(false);
    setSearchTerm("");
  };

  // 엔터 키 입력 시 검색 페이지로 리다이렉트하는 함수
  const handleKeyDown = (e) => {
    // 입력된 키가 'Enter'이고, 검색어가 비어있지 않을 때 실행
    if (e.key === "Enter" && searchTerm.trim()) {
      e.preventDefault(); // 기본 동작(새로고침 등) 방지
      // '/search' 경로로 이동하면서 검색어를 쿼리 파라미터로 넘김
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setIsFocused(false); // 드롭다운 숨기기
    }
  };

  return (
    <SearchWrapper ref={searchWrapperRef}>
      <StyledInput
        type="text"
        placeholder="애니메이션, 영화 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onKeyDown={handleKeyDown}
      />
      <ResultsContainer $isFocused={isFocused}>
        {isLoading ? (
          <LoadingSpinner>🔍 로딩 중...</LoadingSpinner>
        ) : results.length > 0 ? (
          results.map((item) => (
            <ResultItem
              key={`${item.media_type}-${item.id}`}
              onClick={() => handleItemClick(item)}
            >
              <ResultImage
                src={`${IMAGE_BASE_URL}${item.poster_path}`}
                alt={item.title || item.name}
              />
              {/* 영화는 title, TV는 name을 사용하므로 둘 다 확인 */}
              {item.title || item.name}
            </ResultItem>
          ))
        ) : (
          <NoResults>검색 결과가 없습니다.</NoResults>
        )}
      </ResultsContainer>
    </SearchWrapper>
  );
};

export default Searchbar;

// --- Styled Components (변경 없음) ---
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
`;
const ResultsContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: auto; // 내용이 많아지면 스크롤
  max-height: ${(props) => (props.$isFocused ? "400px" : "0")};
  opacity: ${(props) => (props.$isFocused ? "1" : "0")};
  visibility: ${(props) => (props.$isFocused ? "visible" : "hidden")};
  transition: all 0.3s ease-in-out;
`;
const ResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 18px;
  color: #333;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;
const ResultImage = styled.img`
  width: 40px;
  height: 60px;
  border-radius: 4px;
  margin-right: 12px;
  object-fit: cover;
  flex-shrink: 0; // 이미지가 찌그러지지 않도록 설정
`;
const NoResults = styled.div`
  padding: 12px 18px;
  color: #999;
`;
const LoadingSpinner = styled(NoResults)``;
