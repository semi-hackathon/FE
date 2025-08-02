// src/pages/TvAnimePage.jsx
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import AnimePageLayout from "../components/animation/AnimePageLayout";

const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

// ✅ TV 애니메이션 장르 전체 목록 (애니메이션은 기본 포함됨)
const genreOptions = [
  { label: "전체", value: 0 },
  { label: "액션 & 모험", value: 10759 },
  { label: "코미디", value: 35 },
  { label: "범죄", value: 80 },
  { label: "다큐멘터리", value: 99 },
  { label: "드라마", value: 18 },
  { label: "가족", value: 10751 },
  { label: "어린이", value: 10762 },
  { label: "미스터리", value: 9648 },
  { label: "뉴스", value: 10763 },
  { label: "리얼리티", value: 10764 },
  { label: "SF & 판타지", value: 10765 },
  { label: "토크쇼", value: 10767 },
  { label: "전쟁 & 정치", value: 10768 },
  { label: "서부극", value: 37 },
];

const TvAnimePage = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const toggleGenre = (genreValue) => {
    if (genreValue === 0) {
      setSelectedGenres([]);
    } else {
      setSelectedGenres((prev) =>
        prev.includes(genreValue)
          ? prev.filter((g) => g !== genreValue)
          : [...prev, genreValue]
      );
    }
  };

  const fetchTvAnimePage = async ({ pageParam = 1 }) => {
    const withGenres = ["16", ...selectedGenres].filter((v) => v !== 16).join(",");

    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/discover/tv`,
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
        <Title>TV 애니메이션</Title>
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
        queryKey={["tv-animes", selectedGenres]}
        queryFn={fetchTvAnimePage}
        isMovie={false}
      />
    </Container>
  );
};

export default TvAnimePage;

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
