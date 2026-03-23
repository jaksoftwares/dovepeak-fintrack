import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  noPadding?: boolean;
}

export default function Card({ 
  children, 
  className, 
  title, 
  subtitle, 
  action,
  noPadding = false
}: CardProps) {
  return (
    <div className={cn(
      "bg-white rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)]",
      className
    )}>
      {(title || action) && (
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <div>
            {title && (
              <h3 className="text-lg font-bold text-[#0F172A] font-poppins leading-tight tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-slate-500 font-medium mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="ml-4">{action}</div>}
        </div>
      )}
      <div className={cn(!noPadding && "px-8 py-6")}>
        {children}
      </div>
    </div>
  );
}
