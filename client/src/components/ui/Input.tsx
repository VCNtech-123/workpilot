interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      className={`
        w-full 
        px-4 
        py-2 
        rounded-lg 
        border 
        border-app 
        bg-card 
        text-app 
        focus:outline-none 
        focus:ring-2 
        focus:ring-(--color-primary)
        transition 
        ${className}
      `}
      {...props}
    />
  );
};

export default Input;