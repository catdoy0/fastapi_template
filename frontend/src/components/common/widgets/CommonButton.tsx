import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Button } from "../../ui/button";

const variants = {
  none: "",
  default: "bg-slate-800 dark:bg-slate-400 hover:bg-slate-700 dark:hover:bg-slate-500 ",
  outline: "bg-white text-slate-600 border-2 border-slate-400 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 "
}

interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "none" | "default" | "outline";
}

export default function CommonButton({
  children,
  variant = "default",
  className = "",
  ...props
}: CommonButtonProps) {
  return (
    <Button 
      className={`
        inline-flex items-center justify-center
        font-semibold
        text-md
        shadow-md
        transition-colors
        disabled:opacity-60
        disabled:cursor-not-allowed
        disabled:scale-100
        active:scale-95
        hover:cursor-pointer
        px-6 py-5

        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </Button>
  );
}
