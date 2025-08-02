import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import AnimePageLayout from "../components/animation/AnimePageLayout";

const RecommendPage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeByIds = async () => {
      try {
        // 백엔드에서 추천 애니메이션 ID 배열 받아오기
        const response = await axios.get(
          "https://lachelein-bcbhc0debxfah9bw.koreacentral-01.azurewebsites.net/recommend"
        );

        const ids = response.data; // 예: [12345, 67890, ...]
        if (!Array.isArray(ids)) {
          throw new Error("애니메이션 ID 목록이 배열 형태가 아닙니다.");
        }

        const detailPromises = ids.map((id) =>
          axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          })
        );

        const results = await Promise.all(detailPromises);
        const animeData = results.map((res) => res.data);
        setAnimeList(animeData);
      } catch (error) {
        console.error("추천 애니메이션 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeByIds();
  }, []);

  return (
    <Container>
      <Header>
        <Title>추천 애니메이션</Title>
      </Header>

      {loading ? (
        <LoadingText>불러오는 중...</LoadingText>
      ) : (
        <AnimeGrid>
          {animeList.map((anime) => (
            <AnimeCard key={anime.id}>
              <Poster
                src={
                  anime.poster_path
                    ? `https://image.tmdb.org/t/p/w300${anime.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={anime.name}
              />
              <Name>{anime.name}</Name>
            </AnimeCard>
          ))}
        </AnimeGrid>
      )}
    </Container>
  );
};

export default RecommendPage;

// ✅ 기존 코드 유지
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

// ✅ 추가된 스타일
const LoadingText = styled.p`
  text-align: center;
  color: white;
  margin-top: 2rem;
`;

const AnimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  padding: 1rem 1.25rem;
`;

const AnimeCard = styled.div`
  background-color: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
`;

const Poster = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
`;

const Name = styled.div`
  padding: 0.75rem;
  color: white;
  font-size: 1rem;
  font-weight: 500;
`;
