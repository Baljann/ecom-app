import React from "react";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function Button({
  children,
  type = "button",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={
        "w-full py-3 mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg shadow-md transition " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}