"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, ArrowRight, ExternalLink, Inbox, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase/client";

const EMAIL_PROVIDERS = [
  { name: "Gmail", url: "https://mail.google.com/", icon: "G" },
  { name: "Outlook", url: "https://outlook.live.com/", icon: "O" },
  { name: "Yahoo", url: "https://mail.yahoo.com/", icon: "Y" },
];

export default function VerifyEmailPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getEmail() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserEmail(user.email ?? null);
    }
    getEmail();
  }, []);

  const handleResend = async () => {
    if (!userEmail) return;
    setIsLoading(true);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: userEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      }
    });
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Verification email resent!");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-10">
      <Link href="/auth/register" className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-400 hover:text-[#16A34A] uppercase tracking-widest transition-all group w-fit">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Signup
      </Link>

      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-[#0F172A] font-poppins tracking-tight">
           Verify Email
        </h1>
        <p className="text-slate-500 font-medium leading-relaxed">
           Check your inbox and click the activation link to finalize your Dovepeak-Fintrack account.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-8 shadow-sm ring-4 ring-slate-50">
         <div className="flex items-center gap-6">
            <div className="h-16 w-16 bg-[#16A34A]/10 rounded-2xl flex items-center justify-center text-[#16A34A] shadow-inner">
               <Inbox className="h-8 w-8" />
            </div>
            <div>
               <h3 className="text-xl font-bold text-[#0F172A] font-poppins tracking-tight">Check Your Inbox</h3>
               <p className="text-sm text-slate-500 font-medium">Link sent to <span className="text-[#16A34A] font-bold">{userEmail || "your email"}</span></p>
            </div>
         </div>

         <div className="space-y-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Open Email Client</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
               {EMAIL_PROVIDERS.map((provider) => (
                 <a
                   key={provider.name}
                   href={provider.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white hover:text-[#16A34A] hover:border-[#16A34A]/50 transition-all shadow-inner hover:shadow-md"
                 >
                   {provider.name}
                   <ExternalLink className="h-3 w-3 opacity-50" />
                 </a>
               ))}
            </div>
         </div>
      </div>

      <div className="space-y-6">
         <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
            <p className="text-sm font-semibold text-slate-500 leading-relaxed text-center">
              No email received? Check your spam folder or click below to resend.
            </p>
         </div>

         <Button 
           variant="outline" 
           className="w-full h-14 border-[#16A34A]/20 text-[#16A34A] hover:bg-[#16A34A]/5 hover:border-[#16A34A]/40 shadow-none"
           onClick={handleResend}
           isLoading={isLoading}
         >
            Resend Verification Link
         </Button>
      </div>

      <p className="text-center text-slate-500 font-bold text-sm">
         Already verified?{" "}
         <Link href="/auth/login" className="text-[#16A34A] hover:underline underline-offset-4 decoration-2">
           Log In to Dashboard
           <ArrowRight className="inline ml-1 h-3 w-3" />
         </Link>
      </p>
    </div>
  );
}
