import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    const variants = {
      primary: "bg-[#16A34A] text-white hover:bg-green-700 shadow-md hover:-translate-y-0.5 active:scale-95",
      outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300",
      ghost: "text-slate-600 hover:bg-slate-100",
      link: "text-[#16A34A] underline-offset-4 hover:underline",
    };

    const sizes = {
      sm: "h-9 px-4 py-2 rounded-lg text-xs",
      md: "h-12 px-8 py-3 rounded-xl text-sm",
      lg: "h-14 px-10 py-4 rounded-2xl text-base",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          isLoading && "relative",
          className
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit">
             <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        <span className={cn(isLoading && "opacity-0")}>{children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
