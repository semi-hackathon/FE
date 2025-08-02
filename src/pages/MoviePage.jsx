import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import AnimePageLayout from "../components/animation/AnimePageLayout";

const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

// ✅ 영화 장르 전체 목록 (애니메이션은 기본 포함됨)
const genreOptions = [
  { label: "전체", value: 0 },
  { label: "액션", value: 28 },
  { label: "모험", value: 12 },
  { label: "코미디", value: 35 },
  { label: "드라마", value: 18 },
  { label: "판타지", value: 14 },
  { label: "로맨스", value: 10749 },
  { label: "범죄", value: 80 },
  { label: "공포", value: 27 },
  { label: "스릴러", value: 53 },
  { label: "미스터리", value: 9648 },
  { label: "가족", value: 10751 },
  { label: "음악", value: 10402 },
  { label: "다큐멘터리", value: 99 },
  { label: "역사", value: 36 },
  { label: "전쟁", value: 10752 },
  { label: "서부극", value: 37 },
  { label: "SF", value: 878 },
  { label: "TV 영화", value: 10770 },
];

const MoviePage = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const toggleGenre = (genreValue) => {
    if (genreValue === 0) {
      // 전체 클릭 시 초기화
      setSelectedGenres([]);
    } else {
      setSelectedGenres((prev) =>
        prev.includes(genreValue)
          ? prev.filter((g) => g !== genreValue)
          : [...prev, genreValue]
      );
    }
  };

  const fetchMovieAnimePage = async ({ pageParam = 1 }) => {
    const withGenres = ["16", ...selectedGenres].join(","); // 항상 애니메이션(16) 포함

    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/discover/movie`,
      {
        params: {
          with_genres: withGenres,
          language: "ko-KR",
          page: pageParam,
        },
        headers: {
          Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
          accept: "application/json",
        },
      }
    );
    return res.data;
  };

  return (
    <Container>
      <Header>
        <Title>영화 애니메이션</Title>
        <GenreButtonContainer>
          {genreOptions.map((genre) => (
            <GenreButton
              key={genre.value}
              onClick={() => toggleGenre(genre.value)}
              selected={
                genre.value === 0
                  ? selectedGenres.length === 0
                  : selectedGenres.includes(genre.value)
              }
            >
              {genre.label}
            </GenreButton>
          ))}
        </GenreButtonContainer>
      </Header>

      <AnimePageLayout
        queryKey={["movie-animes", selectedGenres]}
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
  flex-direction: column;
  gap: 1rem;
  padding: 0rem 1.25rem;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
`;

const GenreButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const GenreButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 20px;
  border: none;
  background-color: ${({ selected }) => (selected ? "#8A2BE2" : "#2a2a2a")};
  color: ${({ selected }) => (selected ? "white" : "#ccc")};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#7a1fd2" : "#444")};
  }
`;
