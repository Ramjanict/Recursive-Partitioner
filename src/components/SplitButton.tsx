import React, { ButtonHTMLAttributes } from "react";

type SplitButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const SplitButton: React.FC<SplitButtonProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={`bg-[#EBEBEB] px-3 py-1 cursor-pointer ${className || ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default SplitButton;
