// src/hooks/useCustomFetch.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

const useCustomFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setData(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]); // url이 바뀌면 자동으로 재호출 (의존성 관리)

  return { data, isPending, isError };
};

export default useCustomFetch;