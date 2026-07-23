interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-end gap-2 mt-6">

      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 text-sm border border-app rounded-md disabled:opacity-40"
      >
        Prev
      </button>

      <span className="text-sm opacity-70">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 text-sm border border-app rounded-md disabled:opacity-40"
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;