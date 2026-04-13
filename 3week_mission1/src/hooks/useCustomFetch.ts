import { useEffect, useState } from "react";
import axios from "axios";

export function useCustomFetch<T>(url: string, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const { data } = await axios.get<T>(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setData(data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
  }, deps);

  return { data, isPending, isError };
}