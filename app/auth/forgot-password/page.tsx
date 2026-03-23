"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { supabase } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setIsSent(true);
      toast.success("Reset link sent!");
    } catch (err: any) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col gap-10">
      <Link href="/auth/login" className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-400 hover:text-[#16A34A] uppercase tracking-widest transition-all group w-fit">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Login
      </Link>

      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-[#0F172A] font-poppins tracking-tight">
           Reset Password
        </h1>
        <p className="text-slate-500 font-medium leading-relaxed">
           Provide your account email to receive reset instructions.
        </p>
      </div>

      {!isSent ? (
        <form onSubmit={handleSubmit} className="space-y-8">
           <Input
             label="Account Email"
             type="email"
             placeholder="joseph@example.com"
             icon={<Mail className="h-5 w-5" />}
             autoComplete="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
           />
           <Button type="submit" className="w-full h-14" isLoading={isLoading}>
              Send Reset Link
              <ArrowRight className="ml-2 h-5 w-5" />
           </Button>
        </form>
      ) : (
        <div className="bg-green-50 rounded-3xl border border-green-100 p-8 space-y-6">
           <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center text-[#16A34A] shadow-sm">
              <Mail className="h-8 w-8" />
           </div>
           <div className="space-y-1">
              <h3 className="text-xl font-bold text-green-800 font-poppins tracking-tight">Email Sent</h3>
              <p className="text-green-700 font-medium leading-relaxed">
                 Check your inbox for password restoration instructions.
              </p>
           </div>
           <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 transition-all font-bold uppercase tracking-wider text-xs h-10 px-0 shadow-none ring-0 focus:outline-none" onClick={() => setIsSent(false)}>
              Resend Email
           </Button>
        </div>
      )}

      <div className="bg-slate-50 rounded-2xl border border-slate-200 border-dashed p-6">
        <p className="text-xs font-semibold text-slate-500 leading-relaxed text-center">
          Note: Restoration links are valid for 1 hour for your security.
        </p>
      </div>
    </div>
  );
}
