
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
}

const Badge = ({ children, variant = "default" }: BadgeProps) => {
  const variants = {
    default: "bg-gray-200 dark:bg-gray-800 text-app",
    success: "bg-[var(--color-success)] text-white",
    warning: "bg-[var(--color-warning)] text-white",
    danger: "bg-[var(--color-danger)] text-white",
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

export default Badge;