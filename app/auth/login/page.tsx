"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, LogIn, Github, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data.session) {
        toast.success("Welcome back! Redirecting to dashboard...");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      toast.error("An unexpected error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-[#0F172A] font-poppins tracking-tight">
           Welcome Back
        </h1>
        <p className="text-slate-500 font-medium leading-relaxed">
           Sign in to your account to manage your finances.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
         <button 
           type="button"
           className="flex items-center justify-center gap-3 h-12 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
         >
            <Github className="h-5 w-5" />
            GitHub
         </button>
         <button 
           type="button"
           className="flex items-center justify-center gap-3 h-12 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
         >
            <div className="h-5 w-5 flex items-center justify-center">
               <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            </div>
            Google
         </button>
      </div>

      <div className="relative flex items-center justify-center">
         <div className="w-full border-t border-slate-200" />
         <span className="absolute bg-[#F8FAFC] px-4 text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
            Email Access
         </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          icon={<Mail className="h-5 w-5" />}
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="space-y-2">
           <div className="flex items-center justify-between px-1">
              <label className="text-sm font-bold text-[#0F172A] font-poppins">Password</label>
              <Link href="/auth/forgot-password" className="text-xs font-bold text-slate-400 hover:text-[#16A34A] uppercase tracking-widest hover:underline underline-offset-4 ring-0 focus:outline-none">
                 Forgot Password?
              </Link>
           </div>
           <Input
             type="password"
             placeholder="••••••••"
             icon={<Lock className="h-5 w-5" />}
             autoComplete="current-password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
           />
        </div>

        <div className="flex items-center gap-3">
           <input 
             type="checkbox" 
             id="remember" 
             className="h-5 w-5 rounded-lg border-slate-300 text-[#16A34A] focus:ring-[#16A34A]/20 transition-all cursor-pointer accent-[#16A34A]" 
           />
           <label htmlFor="remember" className="text-sm font-semibold text-slate-600 cursor-pointer select-none">
             Keep me logged in
           </label>
        </div>

        <Button type="submit" className="w-full h-14" isLoading={isLoading}>
           Sign In
           <LogIn className="ml-2 h-5 w-5" />
        </Button>
      </form>

      <p className="text-center text-slate-500 font-bold text-sm">
         No account yet?{" "}
         <Link href="/auth/register" className="text-[#16A34A] hover:underline underline-offset-4 decoration-2">
           Create Account
           <ArrowRight className="inline ml-1 h-3 w-3" />
         </Link>
      </p>
    </div>
  );
}
