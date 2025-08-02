import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AnimePageLayout from '../components/animation/AnimePageLayout';

const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

// ✅ 영화 장르 전체 목록
const genreOptions = [
  { label: '전체', value: 16 },
  { label: '액션', value: 28 },
  { label: '모험', value: 12 },
  { label: '코미디', value: 35 },
  { label: '드라마', value: 18 },
  { label: '판타지', value: 14 },
  { label: '로맨스', value: 10749 },
  { label: '범죄', value: 80 },
  { label: '공포', value: 27 },
  { label: '스릴러', value: 53 },
  { label: '미스터리', value: 9648 },
  { label: '가족', value: 10751 },
  { label: '음악', value: 10402 },
  { label: '다큐멘터리', value: 99 },
  { label: '역사', value: 36 },
  { label: '전쟁', value: 10752 },
  { label: '서부극', value: 37 },
  { label: 'SF', value: 878 },
  { label: 'TV 영화', value: 10770 },
];

const MoviePage = () => {
  const [selectedGenre, setSelectedGenre] = useState(0);

  const fetchMovieAnimePage = async ({ pageParam = 1 }) => {
    const withGenres = selectedGenre ? `16,${selectedGenre}` : '16'; // 항상 애니메이션(16)은 포함

    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/discover/movie`, {
      params: {
        with_genres: withGenres,
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

  return (
    <Container>
      <Header>
        <Title>영화 애니메이션</Title>
        <GenreSelect value={selectedGenre} onChange={(e) => setSelectedGenre(Number(e.target.value))}>
          {genreOptions.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.label}
            </option>
          ))}
        </GenreSelect>
      </Header>

      <AnimePageLayout
        queryKey={['movie-animes', selectedGenre]}
        queryFn={fetchMovieAnimePage}
        isMovie={true}
      />
    </Container>
  );
};

export default MoviePage;

// -------- styled-components --------
const Container = styled.div`
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`;

const GenreSelect = styled.select`
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
`;
