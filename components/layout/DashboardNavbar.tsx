"use client";

import { usePathname } from "next/navigation";
import { 
  Bell, 
  Search, 
  Plus, 
  User, 
  LayoutGrid, 
  TrendingUp, 
  TrendingDown,
  ChevronDown
} from "lucide-react";
import { DASHBOARD_NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export default function DashboardNavbar() {
  const pathname = usePathname();
  
  // Find current label based on pathname
  const currentItem = DASHBOARD_NAV_ITEMS.find(item => item.href === pathname) || { label: "Dashboard" };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-20">
      {/* Title / Breadcrumbs */}
      <div className="flex items-center gap-4">
        <div className="md:hidden p-2 rounded-lg bg-slate-100 mr-2">
          <LayoutGrid className="h-5 w-5 text-slate-600" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-[#0F172A] font-poppins">
            {currentItem.label}
          </h1>
          <p className="text-xs text-slate-500 font-medium md:flex hidden">
            Logged in as <span className="text-[#16A34A] ml-1">Joseph Kirika</span>
          </p>
        </div>
      </div>

      {/* Center Search (MD and LG) */}
      <div className="hidden lg:flex items-center max-w-md w-full mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search transactions, budgets..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A] transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-8 flex items-center justify-center bg-white border border-slate-200 rounded text-[10px] text-slate-400 font-bold tracking-tighter">
            ⌘ K
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
           <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-[#16A34A] hover:bg-white rounded-lg transition-all">
             <TrendingUp className="h-3.5 w-3.5 text-[#16A34A]" />
             Add Income
           </button>
           <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-500 hover:bg-white rounded-lg transition-all">
             <TrendingDown className="h-3.5 w-3.5 text-rose-500" />
             Add Expense
           </button>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-[#0F172A] transition-all">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2.5 h-2 w-2 bg-rose-500 border-2 border-white rounded-full"></span>
          </button>
          
          <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>
          
          <button className="flex items-center gap-2 p-1 pl-1 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#16A34A] to-[#10B981] flex items-center justify-center text-white shadow-sm ring-2 ring-white">
              <User className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col items-start leading-none hidden sm:flex">
              <span className="text-sm font-bold text-[#0F172A] mb-0.5">JK</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
