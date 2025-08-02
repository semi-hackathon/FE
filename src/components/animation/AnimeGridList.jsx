import React from 'react';
import styled from 'styled-components';
import AnimeCard from './AnimeCard';
import { useNavigate } from 'react-router-dom';

const AnimeGridList = ({ data, isMovie }) => {
  const navigate = useNavigate();

  // 찜하기 버튼 클릭 시 실행될 함수
  const handleAddToWatchlist = (itemId) => {
    console.log(`[찜하기] ID: ${itemId}`);
    // 여기에 찜 목록에 추가하는 API 호출 등 실제 로직을 구현합니다.
  };

  // 좋아요 버튼 클릭 시 실행될 함수
  const handleLike = (itemId) => {
    console.log(`[좋아요] ID: ${itemId}`);
    // 여기에 좋아요 관련 API 호출 등 실제 로직을 구현합니다.
  };

  const handleMore = (itemId) => {
    console.log(`더보기 클릭 ${itemId}`);
  };
  return (
    <Grid>
      {data?.pages?.map((page, pageIndex) =>
        page.results.map((item) => (
          <AnimeCard
            key={`${item.id}-${pageIndex}`}
            item={item}
            // 1. 카드 전체, 이미지, 재생 버튼 클릭 -> 상세 페이지 이동
            onClick={() => navigate(`/${isMovie ? 'movie' : 'tv'}/${item.id}`)}
            // 2. 찜하기 버튼 클릭 -> handleAddToWatchlist 함수 실행
            onAddToWatchlist={() => handleAddToWatchlist(item.id)}
            // 3. 좋아요 버튼 클릭 -> handleLike 함수 실행
            onLike={() => handleLike(item.id)}
            // 4. 더보기 버튼 클릭 -> handleMore 함수 실행
            onMore={() => handleMore(item.id)}
          />
        ))
      )}
    </Grid>
  );
};

export default AnimeGridList;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 0.9375rem;
`;
