import React, { useEffect, useRef } from 'react';

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * props:
 *  - onLoadMore: () => void - 더 불러올 때 호출되는 콜백
 *  - hasMore: boolean - 더 불러올 데이터가 있는지 여부
 *  - isLoading: boolean - 현재 로딩중인지 여부
 *  - threshold?: number - 바닥에서 얼마나 가까워야 호출할지 (px, 기본 300)
 */
const DebouncedInfiniteScroll = ({ onLoadMore, hasMore, isLoading, threshold = 300 }) => {
  const debouncedScrollRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold && hasMore && !isLoading) {
        onLoadMore();
      }
    };

    debouncedScrollRef.current = debounce(handleScroll, 200);
    window.addEventListener('scroll', debouncedScrollRef.current);

    return () => {
      if (debouncedScrollRef.current) {
        window.removeEventListener('scroll', debouncedScrollRef.current);
      }
    };
  }, [onLoadMore, hasMore, isLoading, threshold]);

  return null; // 렌더링 없음, 이벤트 리스너만 담당
};

export default DebouncedInfiniteScroll;
