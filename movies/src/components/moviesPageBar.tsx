interface PageBarProps {
    page: number;
    setPage: (page: number) => void;
    totalPages: number; // 마지막 페이지 값
    isLoading: boolean; // 현재 로딩 상태
}

export default function MoviesPageBar({page, setPage, totalPages, isLoading}: PageBarProps) {
    const maxPage = Math.min(totalPages, 999); // 안전장치

    return(
        <div className="flex justify-center mb-10 text-xl gap-5">
            <button 
                className="cursor-pointer text-4xl transition-all duration-300 hover:scale-110"
                onClick={() => setPage(Math.max(1, page-1))}
                disabled={page === 1 || isLoading === true}
            >⬅️</button>
            <p>{page} 페이지</p>
            <button
                className="cursor-pointer text-4xl transition-all duration-300 hover:scale-110"
                onClick={() => setPage(Math.min(maxPage, page+1))}
                disabled={page === maxPage || isLoading === true}
            >➡️</button>
        </div>
    )
}