import clsx from "clsx";

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={clsx(
        "bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse",
        className
      )}
    />
  );
};

export default Skeleton;