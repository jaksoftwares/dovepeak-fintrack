import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo-monochrome.svg"
                alt="Dovepeak Fintrack Logo"
                width={200}
                height={40}
                className="h-10 md:h-11 w-auto opacity-70 grayscale transition-opacity hover:opacity-100"
              />
            </Link>
            <p className="text-slate-500 max-w-xs leading-relaxed text-sm">
              A calm, intelligent financial assistant generating clarity and control over your personal finances.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-[#0F172A] mb-4 text-xs uppercase tracking-wider">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#features" className="text-slate-500 hover:text-[#16A34A] transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="text-slate-500 hover:text-[#16A34A] transition-colors">How it works</Link></li>
              <li><Link href="/register" className="text-slate-500 hover:text-[#16A34A] transition-colors">Sign up</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#0F172A] mb-4 text-xs uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="text-slate-500 hover:text-[#16A34A] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-500 hover:text-[#16A34A] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Dovepeak-Fintrack (DFT). Built by Dovepeak Digital.</p>
          <p className="mt-2 md:mt-0 flex items-center">
            Designed with clarity.
          </p>
        </div>
      </div>
    </footer>
  );
}
