import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Dovepeak Fintrack Logo"
                width={200}
                height={40}
                priority
                className="h-10 md:h-11 w-auto"
              />
            </Link>
          </div>
          
          <nav className="hidden md:flex flex-1 justify-center space-x-8 text-sm font-medium text-slate-600">
            <Link href="#features" className="hover:text-slate-900 transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-slate-900 transition-colors">How it Works</Link>
            <Link href="#insights" className="hover:text-slate-900 transition-colors">Insights</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="hidden md:inline-block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center rounded-xl bg-[#16A34A] px-5 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:ring-offset-2 transition-all shadow-sm"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
