import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import AnimePageLayout from "../components/animation/AnimePageLayout";

const FavoritesPage = () => {
  return (
    <Container>
      <Header>
        <Title>찜 목록</Title>
      </Header>
    </Container>
  )
};

export default FavoritesPage;

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
