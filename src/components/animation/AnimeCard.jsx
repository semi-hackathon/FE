import React from 'react';
import styled from 'styled-components';

const AnimeCard = ({ item, onClick }) => {
  const posterPath = `https://image.tmdb.org/t/p/w200${item.poster_path}`;
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;

  return (
    <Card onClick={onClick}>
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
  cursor: pointer;

  img {
    width: 100%;
    height: 15rem;
    object-fit: cover;
    border-radius: 0.625rem;
  }

  p {
    color: white;
    font-weight: bold;
    margin: 0.5rem 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 0.75rem;
    color: lightgrey;
  }
`;
