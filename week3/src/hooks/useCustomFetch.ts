import { useEffect, useMemo, useState } from "react";

type RequestParams = Record<
  string,
  string | number | boolean | null | undefined
>;

type UseCustomFetchOptions = {
  params?: RequestParams;
  headers?: HeadersInit;
  enabled?: boolean;
  errorMessage?: string;
};

type UseCustomFetchResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

const buildRequestUrl = (url: string, params?: RequestParams) => {
  const requestUrl = new URL(url);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        requestUrl.searchParams.set(key, String(value));
      }
    });
  }

  return requestUrl.toString();
};

export const useCustomFetch = <T>(
  url: string | null,
  options: UseCustomFetchOptions = {}
): UseCustomFetchResult<T> => {
  const {
    params,
    headers,
    enabled = true,
    errorMessage = "데이터를 불러오는 중 문제가 발생했습니다.",
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestUrl = useMemo(() => {
    if (!url) {
      return null;
    }

    return buildRequestUrl(url, params);
  }, [url, params]);

  useEffect(() => {
    if (!requestUrl || !enabled) {
      setIsLoading(false);
      return;
    }

    const abortController = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(requestUrl, {
          headers,
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(errorMessage);
        }

        const result = (await response.json()) as T;

        if (!abortController.signal.aborted) {
          setData(result);
        }
      } catch (err) {
        if (abortController.signal.aborted) {
          return;
        }

        setError(
          err instanceof Error && err.message ? err.message : errorMessage
        );
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [requestUrl, headers, enabled, errorMessage]);

  return { data, isLoading, error };
};
