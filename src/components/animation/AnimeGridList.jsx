// components/AnimeGridList.jsx
import React from 'react';
import styled from 'styled-components';
import AnimeCard from './AnimeCard';
import { useNavigate } from 'react-router-dom';

const AnimeGridList = ({ data, isMovie }) => {
  const navigate = useNavigate();

  return (
    <Grid>
      {data?.pages?.map((page, pageIndex) =>
        page.results.map((item) => (
          <AnimeCard
            key={`${item.id}-${pageIndex}`}
            item={item}
            onClick={() => navigate(`/${isMovie ? 'movie' : 'tv'}/${item.id}`)}
          />
        ))
      )}
    </Grid>
  );
};

export default AnimeGridList;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 0.9375rem;
`;
