import { memo } from 'react';
import { Input } from './Input';
import { Checkbox } from './Checkbox';
import { LanguageSelector } from './LanguageSelector';
import type { MovieFilters } from '../constants/movie';

interface MovieFilterProps {
  filters: MovieFilters;
  onChange: (filters: MovieFilters) => void;
  onSubmit: () => void;
}

const MovieFilter = memo(({ filters, onChange, onSubmit }: MovieFilterProps) => {
  console.log('리렌더링 무비 필터');

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow hover:shadow-md transition-shadow">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_auto]">
        {/* 영화 제목 입력 */}
        <div className="w-full">
          <label className="mb-2 block text-sm font-medium text-gray-700">영화 제목</label>
          <Input
            value={filters.query}
            onChange={(value) => onChange({ ...filters, query: value })}
            placeholder="검색어를 입력하세요."
          />
        </div>

        {/* 성인 콘텐츠 */}
        <div className="w-full sm:w-44 flex flex-col justify-end">
          <label className="mb-2 block text-sm font-medium text-gray-700">성인 콘텐츠 표시</label>
          <Checkbox
            id="include_adult"
            checked={filters.include_adult}
            onChange={(checked) => onChange({ ...filters, include_adult: checked })}
            label="성인 콘텐츠 포함"
          />
        </div>

        {/* 언어 선택 */}
        <div className="w-full sm:w-40">
          <label className="mb-2 block text-sm font-medium text-gray-700">🌐 언어</label>
          <LanguageSelector
            value={filters.language}
            onChange={(value) => onChange({ ...filters, language: value })}
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          영화 검색
        </button>
      </div>
    </div>
  );
});

MovieFilter.displayName = 'MovieFilter';

export default MovieFilter;
