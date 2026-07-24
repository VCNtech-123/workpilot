interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {

  const total = Number(totalPages) || 0;

  if (total < 2) return null;

  const isFirstPage = page <= 1;
  const isLastPage = page >= total;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-end gap-2 mt-6">
      <button
        type="button"
        disabled={isFirstPage}
        onClick={() => !isFirstPage && onPageChange(page - 1)}
        className="px-3 py-1 text-sm border border-app rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      <span className="text-sm opacity-70">
        Page {page} of {total}
      </span>

      <button
        type="button"
        disabled={isLastPage}
        onClick={() => !isLastPage && onPageChange(page + 1)}
        className="px-3 py-1 text-sm border border-app rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;