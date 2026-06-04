import { memo, useState } from "react";
import { type MovieFilters, type MovieLanguage } from "../types/movies";
import { Input } from "./Input";
import { SelectBox } from "./SelectBox";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constants/movie";

interface MoivefilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({onChange}: MoivefilterProps) => {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState<MovieLanguage>("ko-KR");

  const handleSubmit = () => {
    const filter: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };

    onChange(filter);
  };

  return (
    <div className="transform space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl transition-all hover:shadow-2xl">
      <div className="flex flex-wrap items-end gap-6">
        <div className="min-w-[450px] flex-1">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            영화 제목
          </label>
          <Input value={query} onChange={setQuery}/>
        </div>

        <div className="min-w-[250px] flex-1">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            옵션
          </label>
          <SelectBox
            checked={includeAdult} 
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="include_adult"
            className="w-full rounded-lg border border-gray-400 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="min-w-[250px] flex-1">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            언어
          </label>
          <LanguageSelector 
            value={language}
            onChange={(value) => setLanguage(value as MovieLanguage)}
            options={LANGUAGE_OPTIONS}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="shrink-0">
          <button
            onClick={handleSubmit}
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
          >
            <svg
              className="h-5 w-5 text-blue-100 transition-transform duration-300 group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span>영화 검색</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieFilter);