import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const Redirection = () => {
  const code = new URL(document.location.toString()).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(import.meta.env.VITE_REDIRECT_URI);
    console.log('인가코드', code);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/kakao/login`, {
        code: code, // 🔥 여기! body에 담아 보냄
      })
      .then((r) => {
        console.log('성공');
        console.log(r);

        // 토큰 저장
        localStorage.setItem('accessToken', r.data.data.token.accessToken);
        localStorage.setItem('userEmail', r.data.userEmail);
        localStorage.setItem('id', r.data.data.id);
        localStorage.setItem('name', r.data.data.name);
        console.log('로컬스토리지 저장 완료');

        navigate('/');
      })
      .catch((err) => {
        console.error('로그인 실패', err.response || err);
      });
  }, []);

  return <div>로그인 중입니다.</div>;
};

export default Redirection;
