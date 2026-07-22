interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const base =
    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200";

  const variants = {
    primary: "btn-primary shadow-sm hover:shadow-md",
    secondary:
      "bg-card border border-app hover:bg-gray-200 dark:hover:bg-gray-800",
    danger:
      "bg-[var(--color-danger)] text-white hover:opacity-90",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;