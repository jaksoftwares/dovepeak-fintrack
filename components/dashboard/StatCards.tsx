"use client";

import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface StatProps {
  label: string;
  value: number;
  trend?: number;
  icon: any;
  color: "green" | "rose" | "blue" | "indigo";
}

const STATS: StatProps[] = [
  { label: "Total Balance", value: 12450.00, trend: 12.5, icon: Wallet, color: "indigo" },
  { label: "Monthly Income", value: 4800.00, trend: 5.2, icon: TrendingUp, color: "green" },
  { label: "Monthly Expenses", value: 3240.50, trend: -2.4, icon: TrendingDown, color: "rose" },
  { label: "Savings Progress", value: 8000.00, trend: 15.0, icon: PiggyBank, color: "blue" },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS.map((stat, i) => {
        const Icon = stat.icon;
        
        return (
          <div 
            key={i}
            className="group relative bg-white border border-slate-200 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all hover:bg-slate-50 overflow-hidden"
          >
            <div className={cn(
               "absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-[0.03] transition-transform group-hover:scale-110",
               stat.color === "green" ? "bg-green-500 rounded-full" : 
               stat.color === "rose" ? "bg-rose-500 rounded-full" : 
               stat.color === "blue" ? "bg-blue-500 rounded-full" : 
               "bg-indigo-500 rounded-full"
            )} />

            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className={cn(
                  "p-3 rounded-2xl ring-1 ring-slate-100 shadow-sm",
                  stat.color === "green" ? "bg-green-50 text-green-600" : 
                  stat.color === "rose" ? "bg-rose-50 text-rose-600" : 
                  stat.color === "blue" ? "bg-blue-50 text-blue-600" : 
                  "bg-indigo-50 text-indigo-600"
                )}>
                  <Icon className="h-6 w-6" />
                </div>
                {stat.trend && (
                  <div className={cn(
                    "flex items-center text-xs font-bold px-2 py-1 rounded-lg",
                    stat.trend > 0 ? "text-green-600 bg-green-50" : "text-rose-600 bg-rose-50"
                  )}>
                    {stat.trend > 0 ? "+" : ""}{stat.trend}%
                  </div>
                )}
              </div>
              
              <p className="text-sm font-semibold text-slate-500 mb-1 font-poppins tracking-tight uppercase">
                {stat.label}
              </p>
              <p className="text-3xl font-extrabold text-[#0F172A] flex items-baseline gap-1">
                {formatCurrency(stat.value)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
