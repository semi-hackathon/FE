import {useEffect, React} from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.REST_API_KEY}&redirect_uri=${import.meta.env.REDIRECT_URL}&response_type=code`;

const LoginLayout = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  }

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if(code) {
      const KakaoLogin = async () => {
        try{
          const response = await axios.post(import.meta.env.REDIRECT_URL, {
            code: code,
          });

          const accessToken = response.data.accessToken;
          localStorage.setItem('accessToken', accessToken);

          navigate("/");
        } catch (error) {
          console.error("카카오 로그인 실패", error);
        }
      };

      KakaoLogin();
    }
  }, [navigate]);


  return (
    <LoginWrapper>
      <Title>제목</Title>
      <LoginContainer>
          <KakaoLoginButton onClick={handleLogin}>카카오로 시작하기</KakaoLoginButton>
      </LoginContainer>
    </LoginWrapper>
  )
};

export default LoginLayout;

const LoginWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`

const LoginContainer = styled.div`
  display: flex;
  height: 30vh;
  justify-content: center;
  align-items: center;
`

const KakaoLoginButton = styled.button`
  height: 5rem;
  font-size: 1.875rem;
  background-color:#fee500;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
`;