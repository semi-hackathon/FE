import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AnimePageLayout from '../components/animation/AnimePageLayout';

const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const genreOptions = [
  { label: '전체', value: 0 },
  { label: '액션', value: 28 },
  { label: '모험', value: 12 },
  { label: '애니메이션', value: 16 },
  { label: '코미디', value: 35 },
  { label: '드라마', value: 18 },
  { label: '판타지', value: 14 },
  { label: '로맨스', value: 10749 },
];

const fetchTvAnimePage = async ({ pageParam = 1 }, selectedGenre) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/discover/tv`, {
    params: {
      with_genres: selectedGenre || 16,
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

const AnimationPage = () => {
  const [selectedGenre, setSelectedGenre] = useState(16);

  const queryFn = ({ pageParam }) => fetchTvAnimePage({ pageParam }, selectedGenre);

  return (
    <Container>
      <Header>
        <Title>TV 애니메이션</Title>
        <GenreSelect
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(Number(e.target.value))}
        >
          {genreOptions.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.label}
            </option>
          ))}
        </GenreSelect>
      </Header>

      <AnimePageLayout
        queryKey={['tv-animes', selectedGenre]}
        queryFn={queryFn}
      />
    </Container>
  );
};

export default AnimationPage;

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
