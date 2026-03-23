"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Filter, 
  Download, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import StatCards from "@/components/dashboard/StatCards";
import TransactionList from "@/components/dashboard/TransactionList";
import BudgetOverview from "@/components/dashboard/BudgetOverview";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col gap-10">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0F172A] font-poppins tracking-tight">
            Financial Overview
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Tracking your progress for March 2026
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-white hover:border-slate-300 transition-all shadow-sm">
            <Calendar className="h-4 w-4" />
            This Month
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-white hover:border-slate-300 transition-all shadow-sm">
            <Filter className="h-4 w-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#16A34A] text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-500/20">
            <Plus className="h-4 w-4" />
            New Transaction
          </button>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="space-y-8">
        {/* Stat Cards Row */}
        <StatCards />

        {/* Secondary Row: Transactions & Budget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions - 2/3 width */}
          <div className="lg:col-span-2">
            <TransactionList />
          </div>

          {/* Budget Overview - 1/3 width */}
          <div className="lg:col-span-1">
             <BudgetOverview />
          </div>
        </div>

        {/* Third Row: Insights & Goals Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card 
             title="Savings Goals" 
             subtitle="You're on track to hit your targets"
             action={<button className="p-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-[#0F172A] underline text-xs font-bold uppercase tracking-wider transition-all">View All</button>}
          >
            <div className="space-y-6 pt-2">
               <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold text-slate-700">
                     <span>New House Fund</span>
                     <span>$45,000 / $100,000</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-500 w-[45%] rounded-full shadow-sm" />
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold text-slate-700">
                     <span>Tech Upgrade</span>
                     <span>$2,100 / $3,500</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-green-500 w-[60%] rounded-full shadow-sm" />
                  </div>
               </div>
            </div>
          </Card>

          <Card title="Debt Progress" subtitle="Reducing your interest payments">
             <div className="flex flex-col h-full justify-between gap-8 py-2">
                <div className="flex items-center gap-6">
                   <div className="h-14 w-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shadow-inner">
                      <ArrowDownRight className="h-7 w-7" />
                   </div>
                   <div>
                      <h4 className="text-2xl font-extrabold text-[#0F172A] font-poppins">-$1,250.00</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total debt reduction this month</p>
                   </div>
                </div>
                <button className="w-full mt-2 py-2.5 text-xs font-bold text-slate-400 hover:text-[#16A34A] border-t border-slate-100 transition-colors uppercase tracking-widest">
                   View debt dashboard
                </button>
             </div>
          </Card>
        </div>
      </section>

      {/* Floating Action Button for Mobile */}
      <button className="md:hidden fixed bottom-6 right-6 h-14 w-14 bg-[#16A34A] text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 ring-4 ring-green-500/20">
         <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
