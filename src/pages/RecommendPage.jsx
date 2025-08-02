import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// 이 페이지는 최종적으로 AnimeGridList를 사용하여 결과를 표시해야 하지만,
// 우선 API 연동에 초점을 맞춰 ID 목록을 간단히 출력하도록 작성되었습니다.

const RecommendPage = () => {
  const [recommendedIds, setRecommendedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // 1. 로컬 스토리지에서 memberId 가져오기
        const memberId = localStorage.getItem('id');

        // memberId가 없으면 로그인 유도 또는 에러 처리
        if (!memberId) {
          throw new Error('로그인 정보가 없습니다. 로그인이 필요합니다.');
        }

        // 2. API 요청 경로와 본문(body) 데이터 준비
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/anime/recommend/${memberId}`;
        const requestBody = {
          q1: '밝고 유쾌한 분위기',
          q2: '일상/로맨스',
          q3: '캐릭터의 감정선과 성장에 집중되는 이야기',
          q4: '빠르게 진행되며 몰입감 있는 전개',
          q5: '성장, 도전, 자아찾기',
        };

        // 3. axios를 사용하여 POST 요청 보내기
        const response = await axios.post(url, requestBody);

        // 4. 응답 데이터를 state에 저장
        console.log(response);
        setRecommendedIds(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  // 5. 로딩 및 에러 상태에 따른 UI 처리
  if (loading) {
    return <StatusText>추천 목록을 불러오는 중...</StatusText>;
  }

  if (error) {
    return <StatusText>오류가 발생했습니다: {error.message}</StatusText>;
  }

  return <></>;
};

export default RecommendPage;

// --- Styled Components ---

const Container = styled.div`
  padding: 1.25rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
  color: white;
`;

const StatusText = styled.p`
  color: #a0a0a0;
  text-align: center;
  padding: 2rem;
`;

const ResultList = styled.ul`
  color: white;
  list-style: none;
  padding: 0;
`;
