import { useEffect, useState } from 'react';
import axios from 'axios';

interface FetchResult<T> {
  data: T | null;
  isPending: boolean;
  isError: boolean;
}

const useCustomFetch = <T>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      setIsError(false);

      try {
        const response = await axios.get(`https://api.themoviedb.org/3${url}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Fetch Error:', error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isPending, isError };
};

export default useCustomFetch;
