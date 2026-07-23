import Skeleton from "../Skeleton";

interface TableSkeletonProps {
  columns: number;
  rows?: number;
}

const TableSkeleton = ({
  columns,
  rows = 5,
}: TableSkeletonProps) => {
  return (
    <div className="bg-card border border-app rounded-xl overflow-hidden">
      <div className="divide-y divide-app">
        {[...Array(rows)].map((_, i) => (
          <div
            key={i}
            className="grid px-6 py-4 gap-4"
            style={{
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
          >
            {[...Array(columns)].map((_, j) => (
              <Skeleton key={j} className="h-4 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;