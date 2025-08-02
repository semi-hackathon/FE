import React from 'react';
import styled from 'styled-components';
import { FaPlay, FaPlus, FaChevronDown } from 'react-icons/fa';

// props로 onAddToWatchlist, onLike 추가
const AnimeCard = ({ item, onClick, onAddToWatchlist, onLike, onMore }) => {
  const posterPath = `https://image.tmdb.org/t/p/w300${item.poster_path}`;
  const title = item.title || item.name;
  const overview = item.overview || '줄거리 정보가 없습니다.';

  // 찜하기 버튼 클릭 핸들러
  const handleWatchlistClick = (event) => {
    event.stopPropagation(); // 이벤트 전파를 막아 상세 페이지로 이동하는 것을 방지
    onAddToWatchlist(); // props로 전달받은 함수 실행
  };

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = (event) => {
    event.stopPropagation(); // 이벤트 전파를 막음
    onLike(); // props로 전달받은 함수 실행
  };
  // 더보기 버튼 클릭 핸들러
  const handleMoreClick = (event) => {
    event.stopPropagation(); // 이벤트 전파를 막음
    onMore();
  };
  return (
    // 전체 카드 클릭 시 상세 페이지 이동 (기존 onClick)
    <CardContainer onClick={onClick}>
      <img src={posterPath} alt={title} />

      <HoverContent className="hover-content">
        <InfoWrapper>
          <p className="title">{title}</p>
          <p className="overview">{overview}</p>
        </InfoWrapper>
        <ButtonWrapper>
          {/* 재생 버튼은 클릭 시 이벤트 전파를 막지 않으므로, 카드 전체의 onClick이 실행됨 */}
          <IconButton title="재생">
            <FaPlay />
          </IconButton>
          {/* 찜하기와 좋아요 버튼에 개별 핸들러 연결 */}
          <IconButton title="내가 찜한 콘텐츠에 추가" onClick={handleWatchlistClick}>
            <FaPlus />
          </IconButton>
          <IconButton title="좋아요" onClick={handleLikeClick}>
            ❤️
          </IconButton>
          <IconButton title="정보 보기" onClick={handleMoreClick}>
            <FaChevronDown />
          </IconButton>
        </ButtonWrapper>
      </HoverContent>
    </CardContainer>
  );
};

export default AnimeCard;

// --- Styled Components ---

const IconButton = styled.button`
  background-color: rgba(42, 42, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.7);
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    border-color: white;
    color: black;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0 1rem 1rem;
`;

const InfoWrapper = styled.div`
  padding: 1rem;
  flex-grow: 1; /* 버튼을 아래로 밀어내기 위해 남은 공간을 모두 차지 */

  .title {
    font-size: 1rem;
    font-weight: bold;
    margin: 0 0 0.5rem;
    color: black;
  }

  .overview {
    font-size: 0.75rem;
    color: lightgrey;
    margin: 0;

    /* 여러 줄 줄임표(...) 처리 */
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 보여줄 줄 수 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const HoverContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 10%, transparent 50%);
  opacity: 0; /* 평소에는 숨김 */
  transition: opacity 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 콘텐츠를 아래쪽으로 정렬 */
`;

const CardContainer = styled.div`
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden; /* 확대되는 이미지가 카드를 벗어나지 않도록 */
  cursor: pointer;
  background-color: #141414;
  column-gap: 1rem;
  // z-index와 transform에 transition을 적용해 부드러운 효과 생성
  transition: transform 0.3s ease-in-out, z-index 0s 0.3s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &:hover {
    // 호버 시 카드를 키우고 다른 카드 위로 올라오도록 z-index 설정
    transform: scale(1.2);
    z-index: 10;

    // 호버 시 HoverContent를 부드럽게 표시
    .hover-content {
      opacity: 1;
    }
  }
`;
