// components/AnimePageLayout.jsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router-dom';
import DebouncedInfiniteScroll from '../../hooks/DebouncedInfiniteScroll';
import AnimeGridList from './AnimeGridList';

const AnimePageLayout = ({ title, queryKey, queryFn, isMovie }) => {
  const { scrollRef } = useOutletContext();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error } = useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      if (el.scrollHeight - el.scrollTop - el.clientHeight < 300 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === 'loading') return <LoadingText>로딩 중...</LoadingText>;
  if (status === 'error') return <LoadingText>에러: {error.message}</LoadingText>;

  return (
    <Container>
      <Title>{title}</Title>

      <AnimeGridList data={data} isMovie={isMovie} />

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

export default AnimePageLayout;

const Container = styled.div`
  padding: 1.25rem;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
  color: white;
`;

const LoadingText = styled.p`
  text-align: center;
`;
