// components/AnimeGridList.jsx
import React from 'react';
import styled from 'styled-components';
import AnimeCard from './AnimeCard';

const AnimeGridList = ({ data, isMovie }) => {
  return (
    <Grid>
      {data?.pages?.map((page, pageIndex) =>
        page.results.map((item) => (
          <AnimeCard
            key={`${item.id}-${pageIndex}`}
            posterPath={item.poster_path}
            title={isMovie ? item.title : item.name}
            date={isMovie ? item.release_date : item.first_air_date}
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
