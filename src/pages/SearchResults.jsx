import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AnimeGridList from "../components/animation/AnimeGridList";
import SkeletonGridList from "../components/animation/SkeletonGridList";
import SkeletonHeader from "../components/animation/SkeletonHeader";

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

  if (isLoading) return (
    <Container>
      <SkeletonHeader />
      <SkeletonGridList />
    </Container>
  );
  if (isError) return <StatusText>오류 발생: {error.message}</StatusText>;

  const results = data?.pages?.[0]?.results || [];

  return (
    <Container>
      <Header>
        <Title>"{searchTerm}"에 대한 검색 결과</Title>
      </Header>
      <LayoutContainer>
        {results.length > 0 ? (
          <AnimeGridList data={data} />
        ) : (
          <StatusText>검색 결과가 없습니다.</StatusText>
        )}
      </LayoutContainer>
    </Container>
  );
};

export default SearchResults;

// --- Styled Components ---
const Container = styled.div`
  padding: 1.5rem;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const StatusText = styled.p`
  text-align: center;
  padding: 2m;
  font-size: 1rem;
  color: #666;
`;

const LayoutContainer = styled.div`
  padding: 1.25rem;
  width: 100%;
`;