import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import DebouncedInfiniteScroll from '../hooks/DebouncedInfiniteScroll ';
const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const fetchAnimePage = async ({ pageParam = 1, queryKey }) => {
  const activeTab = queryKey[1]; // ['animes', activeTab]
  const endpoint =
    activeTab === 'movie'
      ? `${import.meta.env.VITE_BASE_URL}/discover/movie`
      : `${import.meta.env.VITE_BASE_URL}/discover/tv`;

  const res = await axios.get(endpoint, {
    params: {
      with_genres: 16,
      language: 'ko-KR',
      page: pageParam,
    },
    headers: {
      Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      accept: 'application/json',
    },
  });
  return res.data;
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('movie');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error, refetch } = useInfiniteQuery({
    queryKey: ['animes', activeTab],
    queryFn: fetchAnimePage,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  // activeTab 변경 시 강제 refetch (사실 useInfiniteQuery가 키가 바뀌면 자동으로 데이터 초기화함)
  useEffect(() => {
    refetch();
  }, [activeTab, refetch]);

  // 무한 스크롤 이벤트
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === 'loading') return <LoadingText>로딩 중...</LoadingText>;
  if (status === 'error') return <LoadingText>에러: {error.message}</LoadingText>;

  return (
    <Container>
      <TabWrapper>
        <TabButton isActive={activeTab === 'movie'} onClick={() => setActiveTab('movie')}>
          영화 애니메이션
        </TabButton>
        <TabButton isActive={activeTab === 'tv'} onClick={() => setActiveTab('tv')}>
          TV 애니메이션
        </TabButton>
      </TabWrapper>

      <AnimeGrid>
        {/* 수정된 부분: data가 존재하는지 체크하면서 렌더링 */}
        {data?.pages?.map((page, pageIndex) =>
          page.results.map((item) => (
            <AnimeCard key={`${item.id}-${pageIndex}`}>
              <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt="poster" />
              <p>{activeTab === 'movie' ? item.title : item.name}</p>
              <span>{activeTab === 'movie' ? item.release_date : item.first_air_date}</span>
            </AnimeCard>
          ))
        )}
      </AnimeGrid>

      {isFetchingNextPage && <LoadingText>추가 데이터 로딩 중...</LoadingText>}
      {!hasNextPage && <LoadingText>더 이상 데이터가 없습니다.</LoadingText>}

      <DebouncedInfiniteScroll
        onLoadMore={fetchNextPage}
        hasMore={hasNextPage}
        isLoading={isFetchingNextPage}
        threshold={300}
      />
    </Container>
  );
};

export default HomePage;

// styled-components는 그대로 사용
const Container = styled.div`
  padding: 1.25rem; /* 20px */
  width: 100%;
`;

const TabWrapper = styled.div`
  display: flex;
  gap: 0.625rem; /* 10px */
  margin-bottom: 1.25rem; /* 20px */
`;

const TabButton = styled.button`
  padding: 0.625rem 1.25rem; /* 10px 20px */
  background-color: ${({ isActive }) => (isActive ? '#222' : '#eee')};
  color: ${({ isActive }) => (isActive ? '#fff' : '#000')};
  border: none;
  cursor: pointer;
  border-radius: 0.5rem; /* 8px */

  &:hover {
    background-color: #444;
    color: white;
  }
`;

const LoadingText = styled.p`
  text-align: center;
`;

const AnimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr)); /* 120px */
  gap: 0.9375rem; /* 15px */
`;

const AnimeCard = styled.div`
  text-align: center;
  font-size: 0.875rem; /* 14px */

  img {
    width: 100%;
    height: 11.875rem; /* 190px */
    object-fit: cover;
    border-radius: 0.625rem; /* 10px */
  }

  p {
    font-weight: bold;
    margin: 0.5rem 0 0.25rem; /* 8px 0 4px */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 0.75rem; /* 12px */
    color: #666;
  }
`;
