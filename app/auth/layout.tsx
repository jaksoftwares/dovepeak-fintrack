import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { CheckCircle2, ShieldCheck, TrendingUp, Wallet } from "lucide-react";

const BRAND_FEATURES = [
  { icon: Wallet, text: "Seamless financial tracking in real-time." },
  { icon: ShieldCheck, text: "Secure, encrypted personal data vault." },
  { icon: TrendingUp, text: "Advanced insights for long-term growth." },
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel - Branding & Illustration */}
      <div className="hidden lg:flex lg:w-2/5 xl:w-[45%] flex-col relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[#0F172A]">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#16A34A] opacity-10 rounded-full blur-[120px] -mr-96 -mt-96" />
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600 opacity-5 rounded-full blur-[100px] -ml-48 -mb-48" />
           
           {/* Grid Pattern Overlay */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ 
               backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
               backgroundSize: '32px 32px'
             }} 
           />
        </div>

        <div className="relative z-10 flex flex-col h-full px-12 py-12">
          {/* Logo */}
          <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95 duration-300">
            <Image
              src="/logo.svg"
              alt="Dovepeak Fintrack Logo"
              width={220}
              height={50}
              className="h-12 w-auto invert brightness-0"
              priority
            />
          </Link>

          <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto">
             <div className="space-y-12">
                <div className="space-y-6">
                   <h2 className="text-4xl xl:text-5xl font-extrabold text-white font-poppins leading-[1.1] tracking-tight">
                     Simplify your <span className="text-[#16A34A]">financial life</span> with Dovepeak.
                   </h2>
                   <p className="text-slate-400 text-lg font-medium leading-relaxed">
                     A unified system for effective tracking and smarter financial insights.
                   </p>
                </div>

                <div className="space-y-6">
                   {BRAND_FEATURES.map((feat, i) => {
                     const Icon = feat.icon;
                     return (
                       <div key={i} className="flex items-center gap-4 group">
                          <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#16A34A] shadow-sm transform transition-transform group-hover:scale-110 duration-500">
                             <Icon className="h-6 w-6" />
                          </div>
                          <p className="text-white/80 font-bold text-sm tracking-wide group-hover:text-white transition-colors">
                            {feat.text}
                          </p>
                       </div>
                     );
                   })}
                </div>
             </div>
          </div>

          {/* Footer of Left Panel */}
          <div className="pt-12 border-t border-white/10 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
             <div className="flex gap-4">
                <span className="hover:text-[#16A34A] cursor-pointer">Privacy</span>
                <span className="hover:text-[#16A34A] cursor-pointer">Terms</span>
             </div>
             <div>© 2026 DOVEPEAK INC.</div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 py-12 lg:px-24 xl:px-32 bg-[#F8FAFC]">
         {/* Mobile Logo Only */}
         <div className="lg:hidden mb-12 transform -translate-x-1">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Dovepeak Fintrack Logo"
                width={200}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
         </div>

         <main className="w-full max-w-[460px] animate-in fade-in slide-in-from-bottom-6 duration-700">
            {children}
         </main>
      </div>
    </div>
  );
}
