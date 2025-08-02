import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CallbackPage = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    if (code) {
      const kakaoLogin = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/kakao/login?code=${code}`, {});
          const { accessToken, userId } = response.data;

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('id', userId);

          // 로그인 완료 후 메인 페이지로 이동
          navigate('/');
        } catch (error) {
          console.error('카카오 로그인 실패', error);
        }
      };

      kakaoLogin();
    }
  }, [navigate]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default CallbackPage;
