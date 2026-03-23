import Link from "next/link";
import { ArrowRight, LineChart, PieChart, ShieldCheck, Target, Wallet } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F1F5F9] text-[#0F172A] selection:bg-green-100 selection:text-green-900">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] mb-8 leading-tight">
                A calm, intelligent financial assistant for <span className="text-[#16A34A]">clarity and control.</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Track your spending clearly, manage intelligent budgets, and achieve your financial goals without the clutter. Dovepeak Fintrack provides the insights you need to make confident decisions.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link 
                  href="/auth/register" 
                   className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-[#16A34A] px-8 py-3.5 text-base font-semibold text-white hover:bg-green-700 shadow-md transition-all hover:-translate-y-0.5"
                >
                  Start tracking for free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="#features" 
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-white border border-slate-200 px-8 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
                >
                  See how it works
                </Link>
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] pointer-events-none">
            <div className="absolute inset-0 rounded-full bg-[#16A34A] blur-3xl" />
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="pb-24 -mt-16 relative z-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-4 md:p-8 overflow-hidden">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
                <h3 className="text-xl font-bold text-[#0F172A]">Financial Overview</h3>
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-slate-200"></div>
                  <div className="h-3 w-3 rounded-full bg-slate-200"></div>
                  <div className="h-3 w-3 rounded-full bg-slate-200"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#F1F5F9] rounded-xl p-6 border border-slate-100">
                  <p className="text-sm font-medium text-slate-500 mb-1">Total Balance</p>
                  <p className="text-3xl font-bold text-[#0F172A]">$12,450.00</p>
                  <p className="text-sm text-[#16A34A] flex items-center mt-2 font-medium">
                    <ArrowRight className="h-4 w-4 mr-1 -rotate-45" /> +2.4% this month
                  </p>
                </div>
                <div className="bg-[#F1F5F9] rounded-xl p-6 border border-slate-100">
                  <p className="text-sm font-medium text-slate-500 mb-1">Monthly Expenses</p>
                  <p className="text-3xl font-bold text-[#0F172A]">$3,240.50</p>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
                    <div className="bg-[#3B82F6] h-2 rounded-full w-2/3"></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">65% of budget</p>
                </div>
                <div className="bg-[#F1F5F9] rounded-xl p-6 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Savings Goal</p>
                    <p className="text-xl font-bold text-[#0F172A]">Emergency Fund</p>
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <p className="text-2xl font-bold text-[#16A34A]">$8,000</p>
                    <p className="text-sm text-slate-500">of $10,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-[#0F172A] sm:text-4xl mb-4">
                Everything you need to manage money calmly.
              </h2>
              <p className="text-lg text-slate-600">
                We've stripped away the complex jargon to give you a clean, unified toolkit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#F1F5F9] p-8 rounded-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-white text-[#16A34A] flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                  <Wallet className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Income & Expenses</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Log transactions instantly to maintain a unified, clear ledger of your cash flow.
                </p>
              </div>

              <div className="bg-[#F1F5F9] p-8 rounded-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-white text-[#3B82F6] flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                  <PieChart className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Smart Budgets</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Get alerted responsibly before you overspend so you stay safely within limits.
                </p>
              </div>

              <div className="bg-[#F1F5F9] p-8 rounded-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-white text-purple-600 flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Goal Setting</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Track your milestones from active to seamlessly completed as you purposefully progress.
                </p>
              </div>

              <div className="bg-[#F1F5F9] p-8 rounded-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-white text-[#0F172A] flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Debt Management</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Watch your obligations safely decrease as your available balance securely grows.
                </p>
              </div>

              <div className="bg-[#F1F5F9] p-8 rounded-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow md:col-span-2 lg:col-span-2">
                <div className="h-12 w-12 rounded-xl bg-white text-rose-500 flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                  <LineChart className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Actionable Insights</h3>
                <p className="text-slate-600 leading-relaxed text-sm max-w-2xl">
                  Step back and view the bigger picture. Dynamic daily summaries intelligently aggregate your spending by category.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-6">
              Ready to command your financial peak?
            </h2>
            <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
              Join today and turn scattered transactions into clear, structured progress toward your financial peace.
            </p>
            <Link 
              href="/auth/register" 
              className="inline-flex items-center justify-center rounded-xl bg-[#16A34A] px-10 py-4 text-lg font-bold text-white hover:bg-green-700 hover:-translate-y-1 transition-all shadow-md"
            >
              Create your free account
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
