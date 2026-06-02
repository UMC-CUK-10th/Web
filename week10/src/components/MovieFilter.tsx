import { memo, useState } from "react";
import type { MovieFilters } from "../types/movie";
import { Input } from "./Input";
import { SelectBox } from "./SelectBox";
import { LANGUAGE_OPTIONS } from "../constants/movie";
import LanguageSelector from "./LanguageSelector";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState("ko-KR");

  const handleSubmit = () => {
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };

    console.log(filters);
    onChange(filters);
  };

  return (
    <section className="mb-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold text-violet-500">MOVIE SEARCH</p>
        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          영화 검색하기
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          제목, 언어, 옵션을 선택해 원하는 영화를 찾아보세요.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_auto] lg:items-end">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            영화 제목
          </label>
          <Input
            value={query}
            onChange={setQuery}
            placeholder="영화 제목을 입력하세요"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            옵션
          </label>
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 포함"
            id="include-adult"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            언어
          </label>
          <LanguageSelector
            value={language}
            onChange={setLanguage}
            options={LANGUAGE_OPTIONS}
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="h-12 rounded-xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 active:scale-[0.98]"
        >
          영화 검색
        </button>
      </div>
    </section>
  );
};

export default memo(MovieFilter);