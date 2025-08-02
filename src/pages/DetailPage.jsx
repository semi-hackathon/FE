// pages/DetailPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import DetailContent from '../components/animation/DetailContent';

const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const fetchDetail = async (type, id) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/${type}/${id}`, {
    params: { language: 'ko-KR' },
    headers: {
      Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      accept: 'application/json',
    },
  });
  return res.data;
};

const DetailPage = () => {
  const { type, id } = useParams(); // type: 'movie' | 'tv'

  const { data, isLoading, error } = useQuery({
    queryKey: ['detail', type, id],
    queryFn: () => fetchDetail(type, id),
    enabled: !!type && !!id,
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error.message}</p>;
  if (!data) return <p>데이터 없음</p>;

  return <DetailContent data={data} type={type} />;
};

export default DetailPage;
