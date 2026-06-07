export interface LanguageOption {
  value: string;
  label: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
];

export interface MovieFilters {
  query: string;
  include_adult: boolean;
  language: string;
}
