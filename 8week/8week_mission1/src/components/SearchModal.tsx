import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

import { useDebounce } from "../hooks/useDebounce";
import type { Lp, ResponseLpListDto } from "../types/lp";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("TITLE");

  const debouncedQuery = useDebounce(searchTerm, 300);

  console.log("실시간 입력값:", searchTerm);
  console.log("디바운스 적용 값:", debouncedQuery);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery<ResponseLpListDto>({
    queryKey: ["search", debouncedQuery, searchType],

    queryFn: async ({ pageParam }) => {
      console.log("API 요청 실행:", debouncedQuery);

      let url = "";

      const params: Record<string, any> = {
        limit: 10,
      };
      if (pageParam) {
        params.cursor = pageParam;
      }

      if (searchType === "TAG") {
        url = `/v1/lps/tag/${encodeURIComponent(debouncedQuery)}`;
      } else {
        url = `/v1/lps`;
        params.search = debouncedQuery;
      }

      const res = await axios.get<ResponseLpListDto>(url, {
        params,
      });

      return res.data;
    },

    initialPageParam: null,

    enabled: isOpen && debouncedQuery.trim().length > 0,

    getNextPageParam: (lastPage) => {
      const pageData = lastPage?.data;

      return pageData?.hasNext
        ? pageData.nextCursor
        : undefined;
    },

    staleTime: 1000 * 60,

    gcTime: 1000 * 60 * 5,
  });

  if (!isOpen) return null;

  const isEmpty =
    status === "success" &&
    data?.pages?.every(
      (page) => page?.data?.data?.length === 0
    );

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#121212]/95 text-white p-6 overflow-hidden transition-all">
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="p-2 hover:text-gray-400 transition-colors"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="max-w-4xl mx-auto w-full mt-16 px-4 flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center border-b border-gray-500 pb-2 mb-6">
          <input
            autoFocus
            type="text"
            placeholder={
              searchType === "TAG"
                ? "태그를 입력하세요"
                : "검색어를 입력하세요"
            }
            className="bg-transparent text-2xl w-full outline-none placeholder:text-gray-600"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <select
            value={searchType}
            onChange={(e) =>
              setSearchType(e.target.value)
            }
            className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm ml-4 outline-none focus:border-blue-500"
          >
            <option value="TITLE">제목</option>
            <option value="TAG">태그</option>
          </select>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {!debouncedQuery.trim() && (
            <p className="text-center py-10 text-gray-500">
              검색어를 입력하여 LP를 찾아보세요.
            </p>
          )}

          {status === "pending" && debouncedQuery && (
            <p className="text-center py-10 text-gray-500">
              검색 중...
            </p>
          )}

          {status === "error" && (
            <div className="text-center py-10">
              <p className="text-red-400">
                데이터를 불러오는 중 문제가 발생했습니다.
              </p>

              <p className="text-sm text-gray-500">
                {(error as Error)?.message}
              </p>
            </div>
          )}

          {status === "success" && data && (
            <div className="flex flex-col gap-2">
              {data.pages.map((page, pageIndex) => (
                <div key={pageIndex}>
                  {page?.data?.data?.map((lp: Lp) => (
                    <div
                      key={lp.id}
                      className="p-4 border-b border-gray-800 hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-lg font-medium group-hover:text-blue-400">
                            {lp.title}
                          </p>

                          <p className="text-sm text-gray-500">
                            작성자 ID: {lp.authorId}
                          </p>
                        </div>

                        <span className="text-xs text-gray-600">
                          ID: {lp.id}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {isEmpty && (
                <p className="text-center py-10 text-gray-500">
                  검색 결과가 없습니다.
                </p>
              )}
            </div>
          )}

          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="w-full py-6 text-gray-500 hover:text-white transition-colors"
            >
              {isFetchingNextPage
                ? "로딩 중..."
                : "더보기"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;