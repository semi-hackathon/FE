import { useState, useEffect } from "react";

// value: 디바운스할 값, delay: 지연 시간 (ms)
function DebouncedSearch(value, delay) {
  // 디바운스된 값을 저장할 state
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // value가 변경되면 delay 이후에 debouncedValue를 업데이트
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup 함수: 이전 타이머를 제거하여 마지막 입력 후 한 번만 실행되도록 함
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // value나 delay가 변경될 때만 이 effect를 재실행

  // 계산된 디바운스 값을 반환해야 함
  return debouncedValue;
}

export default DebouncedSearch;
