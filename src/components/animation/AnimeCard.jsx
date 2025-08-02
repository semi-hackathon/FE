import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPlus, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const AnimeCard = ({ item, onClick, onAddToWatchlist, onRate }) => {
  const [showRateOptions, setShowRateOptions] = useState(false);

  const posterPath = `https://image.tmdb.org/t/p/w300${item.poster_path}`;
  // 제목과 연령 등급 정보를 item prop에서 가져옵니다.
  const title = item.title || item.name;
  const rating = item.adult ? '18' : '15'; // 예시 데이터

  const handleWatchlistClick = (event) => {
    event.stopPropagation();
    onAddToWatchlist();
  };

  const handleRateClick = (event, rateType) => {
    event.stopPropagation();
    onRate(rateType);
    setShowRateOptions(false);
  };

  return (
    <CardContainer onClick={onClick}>
      <img src={posterPath} alt={title} />

      <HoverContent className="hover-content">
        <ButtonWrapper>
          <IconButton title="재생">
            <FaPlay />
          </IconButton>
          <IconButton title="내가 찜한 콘텐츠에 추가" onClick={handleWatchlistClick}>
            <FaPlus />
          </IconButton>
          <RateButtonContainer
            onMouseEnter={() => setShowRateOptions(true)}
            onMouseLeave={() => setShowRateOptions(false)}
          >
            <RateOptionsPanel isVisible={showRateOptions}>
              <IconButton title="완전 최고예요!" onClick={(e) => handleRateClick(e, 'love')}>
                <DoubleThumbsUp />
              </IconButton>
              <IconButton title="맘에 들어요" onClick={(e) => handleRateClick(e, 'like')}>
                <FaThumbsUp />
              </IconButton>
              <IconButton title="별로예요" onClick={(e) => handleRateClick(e, 'dislike')}>
                <FaThumbsDown />
              </IconButton>
            </RateOptionsPanel>
            <IconButton title="좋아요">
              <FaThumbsUp />
            </IconButton>
          </RateButtonContainer>
        </ButtonWrapper>

        {/* === 추가된 정보 섹션 === */}
        <MetadataWrapper>
          <AgeRating>{rating}</AgeRating>
          <Title>{title}</Title>
        </MetadataWrapper>
      </HoverContent>
    </CardContainer>
  );
};

export default AnimeCard;

const DoubleThumbsUp = () => (
  <span style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
    <FaThumbsUp />
    <FaThumbsUp style={{ position: 'absolute', left: '5px', transform: 'scale(0.8)' }} />
  </span>
);

// --- Styled Components ---

const HoverContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%; /* 새 콘텐츠를 위해 높이 증가 */
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column; /* 콘텐츠를 수직으로 배치 */
  align-items: center;
  justify-content: center;
  gap: 0.75rem; /* 버튼과 정보 사이의 간격 */
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.3s ease-in-out;
`;

const CardContainer = styled.div`
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  background-color: #141414;
  transition: transform 0.3s ease-in-out, z-index 0s 0.3s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &:hover {
    transform: scale(1.4);
    z-index: 10;
    .hover-content {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// --- 새로 추가되거나 수정된 스타일 ---

const MetadataWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const AgeRating = styled.span`
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.7);
  padding: 0.1rem 0.4rem;
  font-size: 0.7rem;
  border-radius: 2px;
  flex-shrink: 0; /* 크기가 줄어들지 않도록 함 */
`;

const Title = styled.p`
  color: white;
  font-size: 0.875rem;
  font-weight: bold;
  margin: 0;
  /* 제목이 길 경우 말줄임표(...) 처리 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// --- 기존 스타일 (일부 수정) ---

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0; /* 패딩 제거, HoverContent에서 전체 관리 */
`;

// 아래 스타일은 이전과 동일합니다.
const RateButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RateOptionsPanel = styled.div`
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  background-color: #2a2a2a;
  border-radius: 2rem;
  padding: 0.5rem;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  transform: ${(props) => (props.isVisible ? 'translate(-50%, 0)' : 'translate(-50%, 10px)')};
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: #2a2a2a transparent transparent transparent;
  }
`;
const IconButton = styled.button`
  background-color: rgba(42, 42, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.7);
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8rem; /* 아이콘 크기 살짝 조정 */
  transition: background-color 0.2s ease, border-color 0.2s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    border-color: white;
    color: black;
  }
`;
