import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const Find = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  // 테스트용 ID와 타입 설정 (영화: 550 = Fight Club, TV: 1399 = Game of Thrones)
  const id = 110070;
  const type = 'tv'; // 'movie' 또는 'tv'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/${type}/${id}`, {
          headers: {
            Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
            Accept: 'application/json',
          },
        });
        setData(res.data);
      } catch (err) {
        setError(err.message || '에러 발생');
      }
    };

    fetchData();
  }, []);

  if (error) return <div>❌ 에러: {error}</div>;
  if (!data) return <div>⏳ 로딩 중...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{type === 'movie' ? data.title : data.name}</h2>
      <p>{type === 'movie' ? data.release_date : data.first_air_date}</p>
      <p>{data.overview}</p>
      {data.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
          alt="poster"
          style={{ marginTop: '1rem', borderRadius: '8px' }}
        />
      )}
    </div>
  );
};

export default Find;
