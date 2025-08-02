// components/DetailContent.jsx
import React from 'react';
import styled from 'styled-components';

const DetailContent = ({ data, type }) => {
  const {
    backdrop_path,
    overview,
    genres,
    vote_average,
    runtime,
    episode_run_time,
    release_date,
    first_air_date,
    title,
    name,
  } = data;

  const displayTitle = type === 'movie' ? title : name;
  const displayDate = type === 'movie' ? release_date : first_air_date;
  const displayRuntime = type === 'movie' ? runtime : episode_run_time?.[0];

  return (
    <Wrapper>
      <Backdrop $backdropPath={backdrop_path}>
        <Overlay>
          <Info>
            <Title>{displayTitle}</Title>
            <SubInfo>
              <span>방영일: {displayDate}</span>
              {displayRuntime && <span>러닝타임: {displayRuntime}분</span>}
              <span>평점: ⭐ {vote_average}</span>
            </SubInfo>
            <Genres>
              {genres.map((genre) => (
                <Genre key={genre.id}>{genre.name}</Genre>
              ))}
            </Genres>
            <Overview>{overview}</Overview>
          </Info>
        </Overlay>
      </Backdrop>
    </Wrapper>
  );
};

export default DetailContent;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.9) 30%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0)),
    url(${(props) => `https://image.tmdb.org/t/p/original${props.$backdropPath}`});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
`;

const Overlay = styled.div`
  padding-left: 5%;
  max-width: 50%;
  color: white;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
`;

const SubInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 1rem;
  color: #ccc;
`;

const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Genre = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
`;

const Overview = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ddd;
`;
