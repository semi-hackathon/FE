import React from "react";
import styled, { keyframes } from "styled-components";

// 기존 SkeletonGridList와 동일한 반짝이는 애니메이션
const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

// 스켈레톤 요소에 애니메이션과 배경을 적용
const SkeletonElement = styled.div`
  animation: ${shimmer} 1.5s infinite linear;
  background: linear-gradient(to right, #202020 8%, #333 18%, #202020 33%);
  background-size: 800px 104px;
  border-radius: 8px; // 부드러운 모서리
`;

// 실제 Header와 동일한 스타일의 스켈레톤 컨테이너
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
`;

// 실제 Title과 유사한 크기의 스켈레톤
const SkeletonTitle = styled(SkeletonElement)`
  width: 10rem; // 타이틀 너비 (조정 가능)
  height: 1.8rem; // 타이틀 폰트 크기와 유사하게
  padding: 1.75rem;
`;

const SkeletonHeader = () => {
  return (
    <HeaderContainer>
      <SkeletonTitle />
    </HeaderContainer>
  );
};

export default SkeletonHeader;
