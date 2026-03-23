"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { DASHBOARD_NAV_ITEMS, SYSTEM_NAV_ITEMS } from "@/constants/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <aside className="w-64 md:w-72 border-r border-slate-200 bg-white h-screen hidden md:block" />
    );
  }

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen border-r border-slate-200 bg-white transition-all duration-300 shadow-sm z-30",
        collapsed ? "w-20" : "w-64 md:w-72"
      )}
    >
      {/* Brand Logo */}
      <div className="flex h-16 items-center px-6 border-b border-slate-100 overflow-hidden">
        <Link href="/dashboard" className="flex items-center min-w-[200px]">
          <Image
            src={collapsed ? "/logo-icon.svg" : "/logo.svg"}
            alt="Dovepeak Fintrack Logo"
            width={collapsed ? 32 : 180}
            height={40}
            style={{ height: 'auto' }}
            className={cn("transition-all", collapsed ? "w-8" : "w-auto h-10")}
            priority
          />
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
        <p className={cn(
          "px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2",
          collapsed && "sr-only"
        )}>
          Menu
        </p>
        {DASHBOARD_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#16A34A]/10 text-[#16A34A]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 transition-transform group-hover:scale-110",
                isActive ? "text-[#16A34A]" : "text-slate-400 group-hover:text-slate-600"
              )} />
              <span className={cn("transition-opacity", collapsed ? "hidden" : "block")}>
                {item.label}
              </span>
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              )}
            </Link>
          );
        })}

        <div className="pt-8 pb-4">
          <p className={cn(
            "px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2",
            collapsed && "sr-only"
          )}>
            System
          </p>
          {SYSTEM_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#16A34A]/10 text-[#16A34A]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-transform group-hover:scale-110",
                  isActive ? "text-[#16A34A]" : "text-slate-400 group-hover:text-slate-600"
                )} />
                <span className={cn("transition-opacity", collapsed ? "hidden" : "block")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer / Toggle & Logout */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-[#0F172A] hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-200"
        >
          {collapsed ? <ChevronRight className="h-5 w-5 mx-auto" /> : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span>Collapse Menu</span>
            </>
          )}
        </button>
        
        <button
          className="mt-2 w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span className={cn(collapsed ? "hidden" : "block")}>Logout</span>
        </button>
      </div>
    </aside>
  );
}
