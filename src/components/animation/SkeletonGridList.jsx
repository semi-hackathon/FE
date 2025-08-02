import React from "react";
import styled, { keyframes } from "styled-components";

// 스켈레톤 UI에 적용할 반짝이는 애니메이션 효과
const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

// 스켈레톤 카드 스타일
const SkeletonCard = styled.div`
  position: relative;
  border-radius: 0.5rem;
  background-color: #202020; // 어두운 배경색
  overflow: hidden;

  // 반짝이는 효과 스타일
  animation: ${shimmer} 1.5s infinite linear;
  background: linear-gradient(to right, #202020 8%, #333 18%, #202020 33%);
  background-size: 800px 104px;
`;

// AnimeGridList와 동일한 그리드 레이아웃
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 0.9375rem;
  padding: 1.25rem; // SearchResults의 Container 패딩과 일치
`;

const SkeletonGridList = ({ count = 10 }) => {
  return (
    <Grid>
      {Array.from({ length: count }, (_, i) => (
        // AnimeCard의 높이와 유사하게 설정
        <SkeletonCard key={i} style={{ height: "15rem" }} />
      ))}
    </Grid>
  );
};

export default SkeletonGridList;
