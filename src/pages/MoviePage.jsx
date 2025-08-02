import React from 'react';
import axios from 'axios';
import AnimePageLayout from '../components/animation/AnimePageLayout';

const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const fetchMovieAnimePage = async ({ pageParam = 1 }) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/discover/movie`, {
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

const MoviePage = () => (
  <AnimePageLayout title="영화 애니메이션" queryKey={['movie-animes']} queryFn={fetchMovieAnimePage} />
);

export default MoviePage;
