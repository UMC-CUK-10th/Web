import { useEffect, useState } from "react";
import axios from "axios";

interface UseCustomFetchReturn<T> {
  data: T | null;
  isPending: boolean;
  isError: boolean;
}

export const useCustomFetch = <T>(url: string | null): UseCustomFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) return;

    let isCancelled = false;

    const fetchData = async () => {
      setIsPending(true);
      setIsError(false);
      setData(null);

      try {
        const response = await axios.get<T>(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });

        if (!isCancelled) {
          setData(response.data);
        }
      } catch (error) {
        console.error(error);

        if (!isCancelled) {
          setIsError(true);
        }
      } finally {
        if (!isCancelled) {
          setIsPending(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [url]);

  return { data, isPending, isError };
};