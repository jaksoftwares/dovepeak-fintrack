"use client";

import Card from "@/components/ui/Card";
import { formatCurrency, cn } from "@/lib/utils";

const BUDGETS = [
  { id: 1, name: "Food & Groceries", limit: 600, spent: 480, color: "#16A34A" },
  { id: 2, name: "Entertainment", limit: 300, spent: 275, color: "#9333EA" },
  { id: 3, name: "Transportation", limit: 200, spent: 85, color: "#3B82F6" },
  { id: 4, name: "Utilities", limit: 400, spent: 390, color: "#E11D48" },
];

export default function BudgetOverview() {
  return (
    <Card 
      title="Monthly Budgets" 
      subtitle="Track your spending by category"
      className="h-full flex flex-col"
    >
      <div className="flex-1 space-y-6">
        {BUDGETS.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const isNearLimit = percentage > 85;
          const isOverLimit = percentage > 100;

          return (
            <div key={budget.id} className="group flex flex-col gap-3 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A] font-poppins">{budget.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {formatCurrency(budget.spent)} of {formatCurrency(budget.limit)}
                  </p>
                </div>
                <div className={cn(
                  "px-2 py-1 rounded-lg text-xs font-bold",
                  isOverLimit ? "bg-rose-50 text-rose-600" :
                  isNearLimit ? "bg-orange-50 text-orange-600" :
                  "bg-green-50 text-green-600"
                )}>
                  {Math.round(percentage)}%
                </div>
              </div>
              
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                 <div 
                   className={cn(
                     "h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)]",
                     isOverLimit ? "bg-rose-500" :
                     isNearLimit ? "bg-orange-500" :
                     "bg-[#16A34A]"
                   )}
                   style={{ width: `${Math.min(percentage, 100)}%` }}
                 />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-tight text-slate-400">
                  Remaining
                </span>
                <span className={cn(
                  "text-xs font-bold font-poppins",
                  isOverLimit ? "text-rose-600" : "text-slate-600"
                )}>
                  {formatCurrency(Math.max(0, budget.limit - budget.spent))}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="mt-8 w-full py-3 px-4 bg-slate-50 border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-white hover:text-[#16A34A] hover:border-[#16A34A]/50 transition-all shadow-sm">
        Review Budgets
      </button>
    </Card>
  );
}
