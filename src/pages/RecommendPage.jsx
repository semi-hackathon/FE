import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import AnimePageLayout from "../components/animation/AnimePageLayout";

const RecommendPage = () => {
  return (
    <Container>
      <Header>
        <Title>추천 애니메이션</Title>
      </Header>
    </Container>
  )
};

export default RecommendPage;

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
