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
        "w-full py-3 mt-4 bg-sky-900 hover:bg-slate-600 text-white font-bold rounded-lg shadow-md transition " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}