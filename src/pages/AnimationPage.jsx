import React from 'react';
import axios from 'axios';
import AnimePageLayout from '../components/animation/AnimePageLayout';

const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const fetchTvAnimePage = async ({ pageParam = 1 }) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/discover/tv`, {
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

const AnimationPage = () => (
  <AnimePageLayout title="TV 애니메이션" queryKey={['tv-animes']} queryFn={fetchTvAnimePage} />
);

export default AnimationPage;
