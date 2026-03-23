"use client";

import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Wallet, 
  ShoppingBag, 
  Home, 
  Coffee, 
  Car,
  MoreVertical
} from "lucide-react";
import Card from "@/components/ui/Card";
import { formatCurrency, cn } from "@/lib/utils";

const TRANSACTIONS = [
  { id: 1, name: "Spotify Subscription", category: "Entertainment", amount: -14.99, date: "2024-03-22", type: "expense", icon: ShoppingBag, color: "rose" },
  { id: 2, name: "Salary Deposit", category: "Income", amount: 4800.00, date: "2024-03-20", type: "income", icon: Wallet, color: "green" },
  { id: 3, name: "Starbucks Coffee", category: "Food & Drinks", amount: -5.50, date: "2024-03-19", type: "expense", icon: Coffee, color: "orange" },
  { id: 4, name: "Uber Ride", category: "Transport", amount: -28.40, date: "2024-03-18", type: "expense", icon: Car, color: "blue" },
  { id: 5, name: "Apartment Rent", category: "Housing", amount: -1200.00, date: "2024-03-15", type: "expense", icon: Home, color: "indigo" },
  { id: 6, name: "Amazon Purchase", category: "Utilities", amount: -89.00, date: "2024-03-12", type: "expense", icon: ShoppingBag, color: "slate" },
];

export default function TransactionList() {
  return (
    <Card 
      title="Recent Activity" 
      subtitle="Your latest 6 transactions"
      action={
        <button className="text-xs font-bold text-[#16A34A] hover:bg-green-50 px-3 py-1.5 rounded-lg transition-all border border-green-100 uppercase tracking-wider">
           View All
        </button>
      }
    >
      <div className="space-y-4">
        {TRANSACTIONS.map((tx) => {
          const Icon = tx.icon;
          return (
            <div key={tx.id} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "h-12 w-12 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110",
                  tx.type === "income" ? "bg-green-50 text-green-600" : "bg-slate-50 text-slate-600"
                )}>
                  <div className={cn(
                    "p-2 rounded-lg",
                    tx.color === "rose" ? "bg-rose-100" : 
                    tx.color === "green" ? "bg-green-100" : 
                    tx.color === "orange" ? "bg-orange-100" : 
                    tx.color === "blue" ? "bg-blue-100" : 
                    tx.color === "indigo" ? "bg-indigo-100" : "bg-slate-200"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A] font-poppins">
                    {tx.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">{tx.category}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-200"></span>
                    <span className="text-xs text-slate-400 font-medium">{new Date(tx.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={cn(
                    "text-sm font-bold font-poppins",
                    tx.type === "income" ? "text-[#16A34A]" : "text-[#0F172A]"
                  )}>
                    {tx.type === "income" ? "+" : ""}{formatCurrency(tx.amount)}
                  </p>
                  <div className="flex items-center justify-end">
                    <span className={cn(
                      "text-[10px] font-extrabold uppercase tracking-tight px-1.5 py-0.5 rounded-md",
                      tx.type === "income" ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-500"
                    )}>
                      {tx.type === "income" ? "received" : "spent"}
                    </span>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg text-slate-400 hover:bg-white hover:text-[#0F172A] hover:shadow-sm border border-transparent hover:border-slate-100 shadow-none transition-all">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
