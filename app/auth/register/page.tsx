"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Mail, Lock, User, UserPlus, Eye, EyeOff, ShieldCheck, ArrowLeft, Coins } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { supabase } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            currency: currency,
          },
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data.user) {
        toast.success("Account created successfully. Please verify your email.");
        router.push("/auth/verify-email");
      }
    } catch (err: any) {
      toast.error("An unexpected error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col gap-10">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-400 hover:text-[#16A34A] uppercase tracking-widest transition-all group w-fit">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Home
      </Link>

      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-[#0F172A] font-poppins tracking-tight">
           Create Account
        </h1>
        <p className="text-slate-500 font-medium leading-relaxed">
           Join Dovepeak-Fintrack to start managing your finances effectively.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
           <Input
             label="Full Name"
             placeholder="Joseph Kirika"
             icon={<User className="h-5 w-5" />}
             value={fullName}
             onChange={(e) => setFullName(e.target.value)}
             required
           />
           <Input
             label="Email Address"
             type="email"
             placeholder="joseph@example.com"
             icon={<Mail className="h-5 w-5" />}
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
           <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                icon={<Lock className="h-5 w-5" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[42px] text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                 {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
           </div>
           <Input
             label="Confirm Password"
             type={showPassword ? "text" : "password"}
             placeholder="••••••••"
             icon={<Lock className="h-5 w-5" />}
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             required
           />
        </div>

        <div className="space-y-2">
           <label className="text-sm font-bold text-[#0F172A] font-poppins ml-1">Preferred Currency</label>
           <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#16A34A]">
                 <Coins className="h-5 w-5" />
              </div>
              <select 
                className="flex h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-10 py-2 text-sm font-medium text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]/20 focus-visible:border-[#16A34A] appearance-none cursor-pointer transition-all"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                 <option value="USD">USD - US Dollar</option>
                 <option value="EUR">EUR - Euro</option>
                 <option value="GBP">GBP - British Pound</option>
                 <option value="KES">KES - Kenya Shilling</option>
                 <option value="NGN">NGN - Nigeria Naira</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                 <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                 </svg>
              </div>
           </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
           <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                id="terms" 
                className="mt-0.5 h-5 w-5 rounded-lg border-slate-300 text-[#16A34A] focus:ring-[#16A34A]/20 cursor-pointer accent-[#16A34A]" 
                required
              />
              <label htmlFor="terms" className="text-sm font-semibold text-slate-600 cursor-pointer select-none leading-relaxed">
                I agree to the <Link href="/terms" className="text-[#16A34A] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#16A34A] hover:underline">Privacy Policy</Link>.
              </label>
           </div>
        </div>

        <Button type="submit" className="w-full h-14" isLoading={isLoading}>
           Sign Up
           <UserPlus className="ml-2 h-5 w-5" />
        </Button>
      </form>

      <div className="flex items-center justify-center gap-2 py-4 border-t border-slate-100">
         <ShieldCheck className="h-4 w-4 text-slate-400" />
         <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">SSL Encrypted</span>
      </div>

      <p className="text-center text-slate-500 font-bold text-sm">
         Already registered?{" "}
         <Link href="/auth/login" className="text-[#16A34A] hover:underline underline-offset-4 decoration-2">
           Log In
         </Link>
      </p>
    </div>
  );
}
