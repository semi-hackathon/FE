import { useEffect, React } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
  import.meta.env.VITE_REST_API_KEY
}&redirect_uri=${import.meta.env.VITE_REDIRECT_URL}&response_type=code`;

const LoginLayout = () => {
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <LoginWrapper>
      <Title>제목</Title>
      <LoginContainer>
        <KakaoLoginButton onClick={handleLogin}>카카오로 시작하기</KakaoLoginButton>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default LoginLayout;

const LoginWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const LoginContainer = styled.div`
  display: flex;
  height: 30vh;
  justify-content: center;
  align-items: center;
`;

const KakaoLoginButton = styled.button`
  width: 20rem;
  height: 5rem;
  font-size: 1.875rem;
  background-color: #fee500;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
`;
