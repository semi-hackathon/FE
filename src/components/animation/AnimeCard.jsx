import React from "react";
import styled from "styled-components";

const AnimeCard = ({ item }) => {
  const posterPath = `https://image.tmdb.org/t/p/w200${item.poster_path}`;

  // 영화(title)와 TV(name) 제목을 모두 처리
  const title = item.title || item.name;
  // 영화(release_date)와 TV(first_air_date) 날짜를 모두 처리
  const date = item.release_date || item.first_air_date;

  return (
    <Card>
      <img src={posterPath} alt={title} />
      <p>{title}</p>
      <span>{date}</span>
    </Card>
  );
};

export default AnimeCard;

const Card = styled.div`
  text-align: center;
  font-size: 0.875rem;

  img {
    width: 100%;
    height: 15rem;
    object-fit: cover;
    border-radius: 0.625rem;
  }

  p {
    font-weight: bold;
    margin: 0.5rem 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 0.75rem;
    color: #666;
  }
`;
