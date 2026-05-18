import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetLpList = (sort: 'ASC' | 'DESC') => {
  return useQuery({
    queryKey: ['lps', sort],
    queryFn: async () => {
      const response = await axios.get(`/v1/lps?sort=${sort}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 3,
  });
};
