import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import React from 'react';
const link = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_REST_API_KEY}&redirect_uri=${
  import.meta.env.VITE_REDIRECT_URL
}&response_type=code`;
function loginHandler() {
  window.location.href = link;
}
function LoginPage() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const r = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
        //형식에 따라 달리함
        email,
        pw,
      });
      // const { accessToken, user_id, user_name } = r.data;

      // localStorage.setItem('accessToken', accessToken);
      // localStorage.setItem('user_id', user_id);
      // localStorage.setItem('user_name', user_name);
      console.log('로그인 폼 제출됨');
    } catch (err) {
      console.error('로그인 실패', err);
      alert('콘솔 확인');
    }
  };

  const handleCheckFormData = () => {
    alert(`email: ${email}, pw: ${pw}`);
  };
  return (
    <PageWrapper>
      <LoginBox>
        <Title>9oormthonUNIV_4th_UOU</Title>
        <form onSubmit={handleSubmit}>
          <label htmlFor="id">아이디</label>
          <Input
            type="email"
            id="id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="아이디를 입력하세요.."
          />

          <label htmlFor="password">비밀번호</label>
          <Input
            type="password"
            id="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호를 입력하세요.."
          />

          <Button onClick={handleCheckFormData} type="submit">
            로그인
          </Button>
        </form>

        <KakaoButton onClick={loginHandler}>Login with Kakao</KakaoButton>

        <ForgotPassword>
          <a href="/forget">Forgot password?</a>
        </ForgotPassword>
      </LoginBox>
    </PageWrapper>
  );
}

export default LoginPage;

const PageWrapper = styled.div`
  min-height: 100vh; //최소 높이 보장
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const LoginBox = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: white;
  padding: 40px 32px;
  border: none;
  border-radius: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  margin-bottom: 16px;
  border: 1px solid #d1d5db;
  background: #f7fafc;
  border-radius: 8px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
  &::placeholder {
    color: #4a709c;
  }
`;

const Button = styled.button`
  width: 100%;
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  padding: 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin-top: 8px;
  transition: 0.2s;
  &:hover {
    background-color: #2563eb;
  }
`;

const KakaoButton = styled.button`
  width: 100%;
  background-color: #fee500;
  color: #000000;
  font-weight: bold;
  padding: 12px;
  border-radius: 8px;
  border: none;
  margin-top: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  &:hover {
    background-color: #ffec3d;
  }
`;

const ForgotPassword = styled.div`
  text-align: center;
  margin-top: 16px;
  font-size: 13px;
  color: #6b7280;
  a {
    color: #3b82f6;
    text-decoration: none; //줄 생겼다 안 생겼다
    &:hover {
      text-decoration: underline;
    }
  }
`;
