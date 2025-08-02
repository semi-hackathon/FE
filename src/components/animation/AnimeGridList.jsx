import React from "react";
import styled from "styled-components";
import AnimeCard from "./AnimeCard";

const AnimeGridList = ({ data }) => {
  return (
    <Grid>
      {data?.pages?.map((page, pageIndex) =>
        page.results.map((item) => (
          // item 객체 전체를 props로 전달
          <AnimeCard key={`${item.id}-${pageIndex}`} item={item} />
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
