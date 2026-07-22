interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`
        bg-card 
        border border-app 
        rounded-xl 
        shadow-sm 
        p-6 
        transition-shadow 
        hover:shadow-md 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;