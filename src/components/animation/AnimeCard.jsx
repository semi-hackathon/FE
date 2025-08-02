// components/AnimeCard.jsx
import React from 'react';
import styled from 'styled-components';

const AnimeCard = ({ posterPath, title, date, onClick }) => {
  return (
    <Card onClick={onClick}>
      <img src={`https://image.tmdb.org/t/p/w200${posterPath}`} alt="poster" />
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
  cursor: pointer;
`;
