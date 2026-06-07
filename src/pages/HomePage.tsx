import { useState, useMemo, useCallback } from 'react';
import useFetch from '../hooks/useFetch';
import MovieFilter from '../components/MovieFilter';
import MovieList from '../components/MovieList';
import type { MovieResponse } from '../types/movie';
import type { MovieFilters } from '../constants/movie';

const HomePage = () => {
  const [filters, setFilters] = useState<MovieFilters>({
    query: '',
    include_adult: false,
    language: 'ko',
  });

  // useMemo: options 객체를 메모이제이션하여 동일 참조값 유지 → 무한 렌더링 방지
  const searchOptions = useMemo(
    () => ({
      params: {
        query: filters.query,
        include_adult: filters.include_adult,
        language: filters.language,
      },
    }),
    [filters]
  );

  const { data, error, isLoading, fetchData } = useFetch<MovieResponse>('/search/movie', searchOptions);

  // useCallback: 함수 참조값 고정 → memo로 감싼 MovieFilter의 불필요한 리렌더링 방지
  const handleChangeFilters = useCallback((newFilters: MovieFilters) => {
    setFilters(newFilters);
  }, []);

  const handleSearch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="w-full px-6 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">🎬 영화 검색</h1>
        <p className="mt-2 text-gray-500">TMDB API를 활용한 영화 검색 서비스</p>
      </header>

      <MovieFilter
        filters={filters}
        onChange={handleChangeFilters}
        onSubmit={handleSearch}
      />

      <MovieList
        movies={data?.results ?? []}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default HomePage;
