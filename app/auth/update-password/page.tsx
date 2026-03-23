"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { supabase } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Password updated successfully! Redirecting to login...");
      router.push("/auth/login");
    } catch (err: any) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-[#0F172A] font-poppins tracking-tight">
           New Password
        </h1>
        <p className="text-slate-500 font-medium leading-relaxed">
           Enter your new account password below to regain access.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="New Password"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="h-5 w-5" />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          label="Confirm New Password"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="h-5 w-5" />}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button type="submit" className="w-full h-14" isLoading={isLoading}>
           Update Password
           <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>

      <div className="flex items-center justify-center gap-2 py-4 border-t border-slate-100">
         <ShieldCheck className="h-4 w-4 text-slate-400" />
         <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Secure Update</span>
      </div>
    </div>
  );
}
