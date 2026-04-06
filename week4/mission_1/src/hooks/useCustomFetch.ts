import { useEffect, useState } from "react";

function useCustomFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            accept: "application/json",
          },
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.status_message || "데이터 불러오기 실패");
        }

        setData(result);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("알 수 없는 에러");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useCustomFetch;