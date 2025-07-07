const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  color,
}) => {
  const bgColor = color || "#DFB57F";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`     
          h-[42px]   
          text-black        
          font-semibold  
          text-[16px]          
          rounded-[30px] 
          transition-transform 
          duration-200     
          ease-in-out      
          active:scale-95   
          hover:opacity-90  
          flex items-center justify-center
          mx-auto
          ${className}
        `}
      style={{ background: bgColor }}
    >
      {children}
    </button>
  );
};

export default Button;
