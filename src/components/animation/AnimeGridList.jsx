import React from 'react';
import styled from 'styled-components';
import AnimeCard from './AnimeCard';
import { useNavigate } from 'react-router-dom';

const AnimeGridList = ({ data, isMovie }) => {
  const navigate = useNavigate();

  const handleAddToWatchlist = (itemId) => {
    console.log(`[찜하기] ID: ${itemId}`);
  };

  // 기존 handleLike 함수를 handleRate로 변경
  const handleRate = (itemId, rateType) => {
    // rateType: 'dislike', 'like', 'love'
    console.log(`[평가] ID: ${itemId}, 평가 종류: ${rateType}`);
    // 여기에 실제 API 호출 로직을 구현합니다.
  };

  return (
    <Grid>
      {data?.pages?.map((page, pageIndex) =>
        page.results.map((item) => (
          <AnimeCard
            key={`${item.id}-${pageIndex}`}
            item={item}
            onClick={() => navigate(`/${isMovie ? 'movie' : 'tv'}/${item.id}`)}
            onAddToWatchlist={() => handleAddToWatchlist(item.id)}
            // onLike 대신 onRate를 전달하고, rateType을 받도록 수정
            onRate={(rateType) => handleRate(item.id, rateType)}
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
