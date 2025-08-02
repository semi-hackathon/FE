import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AnimeGridList from "../components/animation/AnimeGridList";

// --- API 설정 (별도 파일로 분리해도 좋습니다) ---
const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
    accept: "application/json",
  },
});

// --- 검색 API 호출 및 데이터 필터링 함수 ---
const searchByQuery = async (query) => {
  if (!query) return { pages: [{ results: [] }] };

  const { data } = await apiClient.get("/search/multi", {
    params: {
      query,
      language: "ko-KR",
      include_adult: false,
    },
  });

  // poster_path가 있고, media_type이 'movie' 또는 'tv'인 항목만 필터링
  const filteredResults = data.results.filter(
    (item) =>
      item.poster_path &&
      (item.media_type === "movie" || item.media_type === "tv") &&
      item.genre_ids?.includes(16)
  );

  // AnimeGridList 형식에 맞게 데이터를 반환
  return { pages: [{ results: filteredResults }] };
};

// --- 검색 결과 페이지 컴포넌트 ---
const SearchResults = ({ searchTerm }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["searchResults", searchTerm],
    queryFn: () => searchByQuery(searchTerm),
    staleTime: 1000 * 60 * 5, // 5분
  });

  if (isLoading) return <StatusText>🔍 검색 결과를 불러오는 중...</StatusText>;
  if (isError) return <StatusText>오류 발생: {error.message}</StatusText>;

  const results = data?.pages?.[0]?.results || [];

  return (
    <Container>
      <Title>"{searchTerm}"에 대한 검색 결과</Title>
      {results.length > 0 ? (
        <AnimeGridList data={data} />
      ) : (
        <StatusText>검색 결과가 없습니다.</StatusText>
      )}
    </Container>
  );
};

export default SearchResults;

// --- Styled Components ---
const Container = styled.div`
  padding: 1.25rem;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
`;

const StatusText = styled.p`
  text-align: center;
  padding: 2rem;
  font-size: 1rem;
  color: #666;
`;
