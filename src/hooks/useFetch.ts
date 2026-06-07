import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import type { AxiosRequestConfig } from 'axios';

const useFetch = <T>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get<T>(url, { ...options });
      setData(response.data);
    } catch {
      setError('데이터를 가져오는데 에러가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, fetchData };
};

export default useFetch;
