interface PaginationProps {
  page:number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({ page, setPage } : PaginationProps) => {
  return (
    <div className = 'flex justify-center items-center gap-4 my-8'>
      <button
        className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50' onClick={() => setPage((prev) => prev -1)}>
          {'<'}
      </button>
      
    </div>
  )
}