import StatCards from "@/components/dashboard/StatCards";
import TransactionList from "@/components/dashboard/TransactionList";
import BudgetOverview from "@/components/dashboard/BudgetOverview";
import { ArrowRight, Calendar, Filter, Plus, TrendingUp } from "lucide-react";
import Card from "@/components/ui/Card";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Introduction Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 py-6 bg-white border border-slate-200 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)] relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 bg-[#16A34A]/5 rounded-full ring-8 ring-[#16A34A]/2 transition-transform group-hover:scale-110" />
         <div className="relative z-10 flex flex-col gap-2">
           <h2 className="text-3xl font-extrabold text-[#0F172A] font-poppins tracking-tight flex items-center gap-3">
             Good morning, <span className="text-[#16A34A]">Joseph 👋</span>
           </h2>
           <p className="text-slate-500 font-medium max-w-md leading-relaxed">
             Everything looks good! You've successfully stayed under budget in <span className="text-[#16A34A] font-bold">3 categories</span> this week.
           </p>
         </div>

         <div className="relative z-10 flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white hover:text-[#0F172A] hover:border-[#16A34A]/40 transition-all shadow-sm">
               <Calendar className="h-4 w-4" />
               Mar 2024
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white hover:text-[#0F172A] hover:border-[#16A34A]/40 transition-all shadow-sm">
               <Filter className="h-4 w-4" />
               Filters
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#16A34A] text-white rounded-xl text-sm font-bold hover:bg-green-700 hover:-translate-y-0.5 transition-all shadow-md active:scale-95">
               <Plus className="h-4 w-4" />
               New Entry
            </button>
         </div>
      </section>

      {/* Main Grid Sections */}
      <section className="space-y-8">
        {/* Core Stats */}
        <StatCards />

        {/* Dynamic Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <TransactionList />
          </div>

          {/* Budgeting Visualization */}
          <div className="lg:col-span-1">
            <BudgetOverview />
          </div>
        </div>

        {/* Secondary Insights Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
            {/* Cash Flow Widget */}
            <Card title="Cash Flow Chart" subtitle="Income vs Expenses (7 Days)" noPadding>
              <div className="h-64 flex flex-col items-center justify-center bg-slate-50 rounded-b-3xl border-t border-slate-100 p-8 grayscale opacity-50 relative group cursor-not-allowed">
                 <TrendingUp className="h-10 w-10 text-[#16A34A] mb-4 transition-transform group-hover:scale-110" />
                 <p className="text-sm font-bold text-slate-400 font-poppins uppercase tracking-wider">
                   Chart Coming Soon
                 </p>
                 <span className="text-xs text-slate-300 font-medium mt-1">
                    Powered by Recharts
                 </span>
                 <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] rounded-b-3xl"></div>
              </div>
            </Card>

            {/* Financial Goals Widget */}
            <Card title="Financial Goals" subtitle="Target: Emergency Fund" action={
              <button className="p-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-[#0F172A] transition-all">
                <ArrowRight className="h-4 w-4" />
              </button>
            }>
               <div className="flex flex-col gap-6">
                  <div className="flex items-end justify-between">
                     <div>
                        <p className="text-2xl font-extrabold text-[#0F172A]">$8,000</p>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Current Savings</p>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-bold text-[#16A34A]">$10,000</p>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Target</p>
                     </div>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner ring-1 ring-slate-200/50">
                    <div className="h-full w-[80%] bg-[#16A34A] rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(22,163,74,0.3)]" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100 ring-4 ring-white shadow-sm">
                    <span className="text-xs font-bold text-green-700">80% reached</span>
                    <span className="text-[10px] font-extrabold text-green-600 bg-white px-2 py-0.5 rounded-md uppercase">On track</span>
                  </div>
               </div>
            </Card>

            {/* Debts Widget */}
            <Card title="Upcoming Payments" subtitle="Review your obligations">
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-rose-50 rounded-xl border border-rose-100 animate-pulse-subtle">
                     <div className="flex flex-col">
                        <span className="text-xs font-bold text-rose-800">Bank Loan Repayment</span>
                        <span className="text-[10px] font-bold text-rose-600 uppercase tracking-tighter">Due in 2 days</span>
                     </div>
                     <div className="text-sm font-bold text-rose-700">$240.00</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                     <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700">Student Loan</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Due in 14 days</span>
                     </div>
                     <div className="text-sm font-bold text-slate-600">$150.00</div>
                  </div>
                  <button className="w-full mt-2 py-2.5 text-xs font-bold text-slate-400 hover:text-[#16A34A] transition-all uppercase tracking-widest border-t border-dashed border-slate-200 pt-4">
                    View debt dashboard
                  </button>
               </div>
            </Card>
        </div>
      </section>
    </div>
  );
}
